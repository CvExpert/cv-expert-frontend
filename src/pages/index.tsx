import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import { Code } from '@heroui/code';
import { button as buttonStyles } from '@heroui/theme';

import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Optimise your Resume with &nbsp;</span>
          <span className={title({ color: 'violet' })}>AI </span>
          <span className={title()}>& Land Your Dream Job Faster!</span>
          <div className={subtitle({ class: 'mt-4' })}>
            Get instant AI-powered feedback, optimize your resume, and boost your chances of landing
            your dream job." 🚀
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={
              buttonStyles({
                // color: "",
                radius: 'full',
                variant: 'shadow',
              }) +
              'max-w-md drop-shadow-md border border-default bg-gradient-to-r from-pink-400 to-red-400 tracking-wider font-medium text-default-600 text-foreground/90'
            }
            href={siteConfig.links.docs}
          >
            Use Demo without SignIn
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: 'bordered', radius: 'full' })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Upload Your Resume{' '}
              <Code color="primary">
                <Link href="/upload">Upload</Link>
              </Code>
            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
