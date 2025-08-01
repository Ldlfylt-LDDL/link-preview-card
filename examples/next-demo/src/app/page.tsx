import { LinkPreview } from '@ldlfylt/link-preview-card'

const demoUrls = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    description: 'Popular code hosting platform'
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    description: 'Cloud platform for static sites and Serverless Functions'
  },
  {
    name: 'React',
    url: 'https://react.dev',
    description: 'The library for web and native user interfaces'
  },
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    description: 'A utility-first CSS framework'
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    description: 'JavaScript with syntax for types'
  },
  {
    name: 'Next.js',
    url: 'https://nextjs.org',
    description: 'The React Framework for Production'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🔗 Link Preview Card - RSC Demo
              </h1>
              <p className="mt-2 text-gray-600">
                Server-side rendering with React Server Components
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Ldlfylt-LDDL/link-preview-card"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@ldlfylt/link-preview-card"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                npm
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ RSC Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Server-Side Rendering</h3>
              <p className="text-gray-600 text-sm">Zero JS sent to browser</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">No CORS Issues</h3>
              <p className="text-gray-600 text-sm">Server-side fetching</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Themeable</h3>
              <p className="text-gray-600 text-sm">Tailwind-based styling</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="font-semibold text-gray-900 mb-2">Tiny Size</h3>
              <p className="text-gray-600 text-sm">&lt;2 KB core size</p>
            </div>
          </div>
        </section>

        {/* Demo URLs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Live RSC Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {demoUrls.map((demo) => (
              <div key={demo.url} className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{demo.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
                <div className="text-xs text-gray-500 mb-4 break-all">{demo.url}</div>
                  <LinkPreview url={demo.url} theme="card" />
              </div>
            ))}
          </div>
        </section>

        {/* Theme Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Theme Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Theme</h3>
              <LinkPreview url="https://github.com" theme="card" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inline Theme</h3>
              <LinkPreview url="https://github.com" theme="inline" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Theme 2</h3>
              <LinkPreview url="https://github.com" theme="card2"/>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inline Theme with Domain</h3>
              <LinkPreview url="https://github.com" theme="inline-domain" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inline Theme with Tooltip</h3>
              <LinkPreview url="https://github.com" theme="inline-tooltip" />
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">RSC Usage</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`import { LinkPreview } from "@ldlfylt/link-preview-card";

// This is a Server Component
export default async function MyPage() {
  return (
    <LinkPreview 
      url="https://vercel.com" 
      theme="card"
    />
  );
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Installation</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
                <code>npm i @ldlfylt/link-preview-card</code>
              </pre>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              📘 Requires React 19+ & Tailwind CSS v4
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Made with ❤️ by the link-preview-card team</p>
            <p className="mt-2 text-sm">
              <a
                href="https://github.com/Ldlfylt-LDDL/link-preview-card"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 