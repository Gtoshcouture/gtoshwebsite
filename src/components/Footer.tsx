import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2A1C14] text-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Shop</p>
          <div className="flex flex-col gap-3">
            <Link href="/shop/clothing" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">Clothing</Link>
            <Link href="/shop/bags" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">Bags</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Studio</p>
          <div className="flex flex-col gap-3">
            <Link href="/about" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Help</p>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">Shipping & Returns</Link>
            <Link href="/contact" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-5">Follow</p>
          <div className="flex flex-col gap-3">
            <a href="https://instagram.com/gtoshcouture" target="_blank" rel="noopener noreferrer" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">Instagram</a>
            <a href="https://tiktok.com/@gtosh" target="_blank" rel="noopener noreferrer" className="text-sm text-[#F7F3EC]/60 hover:text-[#F7F3EC] transition-colors">TikTok</a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#F7F3EC]/10 px-6 md:px-12 py-5 flex items-center justify-between">
        <span className="font-['Playfair_Display',serif] text-lg tracking-[0.3em] text-[#F7F3EC]/30">GTOSH</span>
        <p className="text-[11px] text-[#F7F3EC]/25">© {new Date().getFullYear()} GTOSH</p>
      </div>
    </footer>
  );
}
