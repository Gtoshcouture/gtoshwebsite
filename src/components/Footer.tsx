import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F7F3EC] border-t border-[#3E2A1E]/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="text-[13px] text-[#3E2A1E] mb-4">Shop</p>
          <div className="flex flex-col gap-2.5">
            <Link href="/shop/clothing" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Clothing</Link>
            <Link href="/shop/bags" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Bags</Link>
          </div>
        </div>
        <div>
          <p className="text-[13px] text-[#3E2A1E] mb-4">Company</p>
          <div className="flex flex-col gap-2.5">
            <Link href="/about" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Our Story</Link>
            <Link href="/contact" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-[13px] text-[#3E2A1E] mb-4">Follow</p>
          <div className="flex flex-col gap-2.5">
            <a href="https://instagram.com/gtoshcouture" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Instagram</a>
            <a href="https://tiktok.com/@gtosh" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">TikTok</a>
          </div>
        </div>
        <div>
          <p className="text-[13px] text-[#3E2A1E] mb-4">Help</p>
          <div className="flex flex-col gap-2.5">
            <Link href="/contact" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Shipping</Link>
            <Link href="/contact" className="text-[13px] text-[#9B7B68] hover:text-[#3E2A1E] transition-colors">Returns</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#3E2A1E]/10 px-6 md:px-14 py-5 flex items-center justify-between">
        <span className="font-['Playfair_Display',serif] italic text-lg text-[#9B7B68]">gtosh.</span>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-[12px] text-[#9B7B68]/30 hover:text-[#9B7B68]/60 transition-colors">Admin</Link>
          <p className="text-[12px] text-[#9B7B68]/60">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
