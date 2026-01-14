export default function Home() {
  return (
    <main className="p-8">
      {/* Typography Test */}
      <section>normal</section>
      <section className="mb-8">Typography Test Normal</section>
      <section className="mb-8">
        <h2 className="text-header-xl text-navy mb-4">Typography Test</h2>

        <div className="space-y-2">
          <p className="text-header-xl">Header XL (20px/28px, Medium)</p>
          <p className="text-header-lg">Header LG (18px/24px, Medium)</p>
          <p className="text-header-md">Header MD (16px/20px, Medium)</p>
          <p className="text-body-lg">Body LG (16px/24px, Medium)</p>
          <p className="text-body-md">Body MD (14px/24px, Regular)</p>
          <p className="text-caption-lg">Caption LG (14px/20px, Regular)</p>
          <p className="text-caption-md">Caption MD (12px/16px, Medium)</p>
          <p className="text-caption-sm">Caption SM (10px/12px, Light)</p>
        </div>
      </section>

      {/* Color Test */}
      <section>
        <h2 className="text-header-xl text-navy mb-4">Color Test</h2>

        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 bg-pink rounded flex items-center justify-center">
            <span className="text-white text-caption-md">Pink</span>
          </div>
          <div className="w-20 h-20 bg-navy rounded flex items-center justify-center">
            <span className="text-white text-caption-md">Navy</span>
          </div>
          <div className="w-20 h-20 bg-black rounded flex items-center justify-center">
            <span className="text-white text-caption-md">Black</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-caption-md">100</span>
          </div>
          <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-caption-md">200</span>
          </div>
          <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-caption-md">300</span>
          </div>
          <div className="w-20 h-20 bg-gray-500 rounded flex items-center justify-center">
            <span className="text-white text-caption-md">500</span>
          </div>
          <div className="w-20 h-20 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-white text-caption-md">800</span>
          </div>
        </div>
      </section>
    </main>
  );
}
