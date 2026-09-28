/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import WhatWeAre from "./pages/WhatWeAre";
import WhatWeDo from "./pages/WhatWeDo";
import ApplyNow from "./pages/ApplyNow";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Mission from "./pages/Mission";
import Vision from "./pages/Vision";
import Organisation from "./pages/Organisation";
import OurWorkInAction from "./pages/OurWorkInAction";
import Partners from "./pages/Partners";
import JobOpenings from "./pages/JobOpenings";
import JobDetails from "./pages/JobDetails";
import WhyChooseMaisc from "./pages/WhyChooseMaisc";
import KeyIndustriesServed from "./pages/KeyIndustriesServed";
import AdminJobs from "./pages/AdminJobs";
import EuropeanPartnerForm from "./pages/EuropeanPartnerForm";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminJobs />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="what-we-are" element={<WhatWeAre />} />
          <Route path="what-we-do" element={<WhatWeDo />} />
          <Route path="why-choose-maisc" element={<WhyChooseMaisc />} />
          <Route path="job-openings" element={<JobOpenings />} />
          <Route path="job-openings/:jobId" element={<JobDetails />} />
          <Route path="jobs/:jobId" element={<JobDetails />} />
          <Route path="key-industries-served" element={<KeyIndustriesServed />} />
          <Route path="international-partners" element={<Partners />} />
          <Route path="our-work-in-action" element={<OurWorkInAction />} />
          <Route path="partners" element={<Partners />} />
          <Route path="recruitment-partner-form" element={<EuropeanPartnerForm />} />
          <Route path="manpower-request" element={<EuropeanPartnerForm />} />
          <Route path="european-recruitment-partner" element={<EuropeanPartnerForm />} />
          <Route path="apply-now" element={<ApplyNow />} />
          <Route path="apply" element={<ApplyNow />} />
          <Route path="candidate-application" element={<ApplyNow />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<WhoWeAre />} />
          <Route path="mission" element={<Mission />} />
          <Route path="vision" element={<Vision />} />
          <Route path="organisation" element={<Organisation />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
