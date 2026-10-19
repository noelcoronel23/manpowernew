/**
 * Google Apps Script Web App Integration for Job Openings
 * Dispatches recruiter submissions directly into Google Sheets with status "Pending Review"
 */

export interface GoogleJobSubmissionPayload {
  jobTitle: string;
  category: string;
  hiringStatus: string;
  location: string;
  jobType: string;
  experience: string;
  salary: string;
  skills: string;
  description: string;
  applicationLink: string;

  // Additional aliases & workflow metadata for maximum compatibility
  title?: string;
  status?: string;
  type?: string;
  keySkills?: string | string[];
  applyUrl?: string;
  submissionStatus?: "Pending Review";
  submittedAt?: string;
  submissionId?: string;
}

export interface GoogleJobSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  submissionId?: string;
}

/**
 * Submits a new job opening to the configured Google Apps Script Web App endpoint.
 * Sends POST request with JSON containing the exact properties:
 * - jobTitle
 * - category
 * - hiringStatus
 * - location
 * - jobType
 * - experience
 * - salary
 * - skills
 * - description
 * - applicationLink
 */
export async function submitJobOpeningToGoogleSheets(
  payload: GoogleJobSubmissionPayload
): Promise<GoogleJobSubmissionResult> {
  const scriptUrl = import.meta.env.VITE_GOOGLE_JOB_SUBMISSION_URL?.trim();

  if (!scriptUrl) {
    return {
      success: false,
      error: "Google Apps Script Web App URL is not configured. Please set VITE_GOOGLE_JOB_SUBMISSION_URL in your environment or .env file before submitting.",
    };
  }

  // Exact JSON payload with the 10 requested property names
  const jsonBody = {
    jobTitle: payload.jobTitle,
    category: payload.category,
    hiringStatus: payload.hiringStatus,
    location: payload.location,
    jobType: payload.jobType,
    experience: payload.experience,
    salary: payload.salary,
    skills: payload.skills,
    description: payload.description,
    applicationLink: payload.applicationLink,

    // Aliases & workflow status for script compatibility
    title: payload.jobTitle,
    status: payload.hiringStatus,
    type: payload.jobType,
    keySkills: payload.skills,
    applyUrl: payload.applicationLink,
    submissionStatus: "Pending Review",
    submittedAt: payload.submittedAt || new Date().toISOString(),
    submissionId: payload.submissionId || `REQ-${Date.now().toString(36).toUpperCase()}`
  };

  try {
    let response: Response;
    try {
      // First try standard application/json POST
      response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      });
    } catch {
      // If browser CORS preflight blocks Content-Type: application/json (common with Google Apps Script web apps),
      // retry with text/plain which delivers the exact same JSON body without triggering preflight errors
      response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(jsonBody),
      });
    }

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      try {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          // Plain text response
        }
      } catch {
        // ignore
      }
    }

    if (response.ok || (data && (data.status === "success" || data.result === "success"))) {
      return {
        success: true,
        message: "Job opening submitted successfully. It is pending admin review.",
        submissionId: data?.submissionId || jsonBody.submissionId,
      };
    }

    if (data && data.error) {
      return {
        success: false,
        error: data.error,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Google Apps Script returned HTTP ${response.status} (${response.statusText || "Error"}).`,
      };
    }

    return {
      success: true,
      message: "Job opening submitted successfully. It is pending admin review.",
      submissionId: jsonBody.submissionId,
    };
  } catch (err: any) {
    console.error("Google Apps Script submission network exception:", err);
    return {
      success: false,
      error: err?.message || "Unable to reach Google Apps Script Web App. Please verify your network connection and ensure the Web App is deployed with 'Who has access: Anyone'.",
    };
  }
}

/**
 * Google Apps Script and Column Specification Reference
 */
export const GOOGLE_SHEET_COLUMN_HEADERS = [
  "Submission ID",
  "Timestamp",
  "Submission Status",
  "Job Title",
  "Category",
  "Hiring Status",
  "Location / Country",
  "Job Type / Contract",
  "Experience Requirement",
  "Salary / Compensation",
  "Key Skills & Qualifications",
  "Job Description & Scope",
  "Application Link",
];

export const GOOGLE_APPS_SCRIPT_SAMPLE_CODE = `/**
 * MAISC Job Openings Submission Handler
 * Google Apps Script Web App
 */

function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = [
    "Submission ID",
    "Timestamp",
    "Submission Status",
    "Job Title",
    "Category",
    "Hiring Status",
    "Location / Country",
    "Job Type / Contract",
    "Experience Requirement",
    "Salary / Compensation",
    "Key Skills & Qualifications",
    "Job Description & Scope",
    "Application Link"
  ];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0B2149");
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is currently empty
    if (sheet.getLastRow() === 0) {
      setupHeaders();
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    var submissionId = data.submissionId || ("REQ-" + Utilities.formatDate(new Date(), "GMT+8", "yyyyMMdd-HHmmss"));
    var timestamp = data.submittedAt || new Date().toISOString();
    var submissionStatus = "Pending Review"; // Forced status for administrative review workflow
    
    // Exact property names sent from the form:
    var jobTitle = data.jobTitle || data.title || "";
    var category = data.category || "";
    var hiringStatus = data.hiringStatus || data.status || "";
    var location = data.location || "";
    var jobType = data.jobType || data.type || "";
    var experience = data.experience || "";
    var salary = data.salary || "";
    var skills = data.skills || (Array.isArray(data.keySkills) ? data.keySkills.join(", ") : (data.keySkills || ""));
    var description = data.description || "";
    var applicationLink = data.applicationLink || data.applyUrl || "";
    
    // Append candidate row
    sheet.appendRow([
      submissionId,
      timestamp,
      submissionStatus,
      jobTitle,
      category,
      hiringStatus,
      location,
      jobType,
      experience,
      salary,
      skills,
      description,
      applicationLink
    ]);
    
    // Return standard JSON response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Job opening submitted successfully. It is pending admin review.",
      submissionId: submissionId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "MAISC Job Opening Intake Web App is active and listening for POST submissions."
  })).setMimeType(ContentService.MimeType.JSON);
}
`;
