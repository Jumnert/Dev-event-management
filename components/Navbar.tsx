"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass sticky top-0 z-50 transition-all duration-300"
    >
      <nav className="flex flex-row justify-between mx-auto container sm:px-10 px-5 py-4">
        <Link href="/" className="logo flex flex-row items-center gap-2 group">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
            <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          </motion.div>
          <p className="text-xl font-bold italic bg-gradient-to-r from-white to-primary bg-clip-text text-transparent group-hover:to-white transition-all duration-300">
            DevEvent
          </p>
        </Link>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/events/create" className="px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold hover:bg-primary hover:text-black transition-all duration-300 shadow-lg shadow-primary/10">
              Create Event
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
