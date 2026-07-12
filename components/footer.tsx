import Link from "next/link";
import { MapPinIcon, PhoneIcon, MailIcon, ArrowRightIcon } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

import { FaLinkedin } from "react-icons/fa";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* marquee / quick links */}
        <div className="overflow-hidden whitespace-nowrap mb-8">
          <div className="animate-marquee inline-flex items-center gap-16 mt-16">
            <span className="marquee-item text-sm sm:text-base font-semibold px-4 text-white/90">
              Explore Our Blog posts on: AI Innovations, Data Science &
              Analytics, Digital Agency Success Stories, E-commerce & Online
              Business, Events & Community Initiatives, Future of Technology,
              Software Development, Team Talks & Behind-the-Scenes, Tech
              Tutorials & How-Tos, UI/UX, Web Design, Web3... Stay ahead with{" "}
              <Link
                href="https://dev-champions.tech"
                target="_blank"
                className="text-[#FDC700] underline"
              >
                Dev Champions IT
              </Link>
            </span>
            <span
              aria-hidden="true"
              className="marquee-item text-sm sm:text-base font-semibold px-4 text-white/90"
            >
              Explore Our Blog posts on: AI Innovations, Data Science &
              Analytics, Digital Agency Success Stories, E-commerce & Online
              Business, Events & Community Initiatives, Future of Technology,
              Software Development, Team Talks & Behind-the-Scenes, Tech
              Tutorials & How-Tos, UI/UX, Web Design, Web3... Stay ahead with{" "}
              <Link
                href="https://dev-champions.tech"
                target="_blank"
                className="text-[#FDC700] underline"
              >
                Dev Champions IT
              </Link>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <Image
                  src="/logo_web_white.png"
                  alt="Tek Core Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  priority
                />{" "}
              </div>

              <div>
                <h2 className="font-bold text-xl">TEK CORE</h2>
                <p className="text-sm text-white/50">
                  Digital Innovation Partner
                </p>
              </div>
            </Link>

            <p className="text-white/70 leading-7">
              We design, build, and scale modern web applications, AI-powered
              solutions, and digital products that help businesses grow faster.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FDC700] px-5 py-3 font-medium text-black transition hover:bg-orange-200"
            >
              Get Free Consultation
              <ArrowRightIcon className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://facebook.com/DevChampions"
                target="_blank"
                className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <SiFacebook size={18} />
              </Link>

              <Link
                href="https://x.com/DevChampions"
                target="_blank"
                className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <SiX size={18} />
              </Link>

              <Link
                href="https://instagram.com/DevChampions"
                target="_blank"
                className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <SiInstagram size={18} />
              </Link>

              <Link
                href="https://www.linkedin.com/company/dev-champions"
                target="_blank"
                className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/https://www.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  Web Development
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  Mobile App Development
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  AI Solutions
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  UI/UX Design
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  Cloud & DevOps
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  href="https://jobs.dev-champions.tech/"
                  target="_blank"
                  className="text-white/70 hover:text-white transition"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="https://blogs.dev-champions.tech/"
                  className="text-white/70 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="https://calendly.com/dev-champions-info/30min"
                  className="text-white/70 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPinIcon className="h-5 w-5 text-[#FDC700] mt-1 shrink-0" />
                <span className="text-white/70">Lagos, Nigeria</span>
              </div>

              <div className="flex gap-3">
                <PhoneIcon className="h-5 w-5 text-[#FDC700] mt-1 shrink-0" />
                <a
                  href="tel:+2349115034504"
                  className="text-white/70 hover:text-white transition"
                >
                  +234 9115 034 504
                </a>
              </div>

              <div className="flex gap-3">
                <MailIcon className="h-5 w-5 text-[#FDC700] mt-1 shrink-0" />
                <a
                  href="mailto:info@dev-champions.tech"
                  className="text-white/70 hover:text-white transition"
                >
                  info@dev-champions.tech
                </a>
              </div>
            </div>

            <div className="mt-8  rounded-2xl border border-white/10 bg-white/5 sm:p-1 p-5">
              <h4 className="font-medium mb-2">Ready to start a project?</h4>

              <p className="text-sm text-white/60 mb-4">
                Tell us about your idea and get a free consultation.
              </p>

              <Link
                href="https://calendly.com/dev-champions-info/30min"
                className="inline-flex items-center gap-2 text-[#FDC700] hover:text-orange-300 font-medium"
              >
                Request a Quote
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50 text-center md:text-left">
            © {new Date().getFullYear()} DEV CHAMPIONS IT. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white/50 hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-white/50 hover:text-white transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
