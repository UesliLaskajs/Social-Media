import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsInstagram,BsLinkedin,BsGithub} from "react-icons/bs"
const FooterComp = () => {
  return (
    <Footer container className="container border border-t-8 border-teal-500">
      <div className="w-full w-max-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex">
          <div className="mb-4">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-xl sm:text-2xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Uesli`s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-3 sm:grid-cols-3 sm:gap-4">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.instagram.com/uesli_laska/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>

                <Footer.Link href="/about" rel="noopener noreferrer">
                  About
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Contact" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/uesli-laska/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </Footer.Link>

                <Footer.Link
                  href="https://github.com/UesliLaskajs"
                  target="_blank"
                  rel="noopener noreferrer "
                >
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Privacy Policy" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/uesli-laska/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Police
                </Footer.Link>

                <Footer.Link
                  href="https://github.com/UesliLaskajs"
                  target="_blank"
                  rel="noopener noreferrer "
                >
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex w-full md:justify-between items-center">
          <Footer.Copyright
            href="#"
            by="Laska Group"
            year={new Date().getFullYear()}
          />
          <div className="flex  gap-6 justify-center pl-4 ">
            <Footer.Icon href="https://github.com/UesliLaskajs" icon={BsInstagram} />
            <Footer.Icon href="https://www.linkedin.com/in/uesli-laska/" icon={BsLinkedin} />
            <Footer.Icon href="https://www.instagram.com/uesli_laska/" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
