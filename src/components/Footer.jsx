import { FaGithub } from 'react-icons/fa'
import { MdBugReport, MdCode } from 'react-icons/md'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const repoUrl = 'https://github.com/devvyyxyz/tools-list'
  const issuesUrl = `${repoUrl}/issues`
  const profileUrl = 'https://github.com/devvyyxyz'

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-white">About</h3>
            <p className="mt-2 text-xs text-white/60">
              A curated collection of development tools and resources.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 flex flex-wrap gap-4">
              <li>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-indigo-400"
                  title="View repository"
                >
                  <MdCode className="text-sm" />
                  Repository
                </a>
              </li>
              <li>
                <a
                  href={issuesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-indigo-400"
                  title="Report issues"
                >
                  <MdBugReport className="text-sm" />
                  Issues
                </a>
              </li>
              <li>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-indigo-400"
                  title="GitHub profile"
                >
                  <FaGithub className="text-sm" />
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Built with</h3>
            <p className="mt-2 text-xs text-white/60">
              React, Vite, and Tailwind CSS
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/50">
            © {currentYear} Tools List. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
