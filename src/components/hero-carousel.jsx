"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

const brandGradient = "from-[rgb(250,80,15)] to-[rgb(255,175,0)]"

const slides = [
	{
		id: "3d-lamps",
		image: "/3d-printed-night-lamp-glowing-premium-banner.jpg",
		title: "3D Printed Night Lamps",
		subtitle: "Personalized glow. Premium finish. Crafted to impress.",
		price: 1499,
		originalPrice: 2299,
		cta: { label: "Customize Yours", href: "/3d-lamps" },
		align: "center",
	},
	{
		id: "3d-lamps-vase",
		image: "/3d-lamp-vase-golden-rings-premium.jpg",
		title: "3D Printed Night Lamps",
		subtitle: "Personalized glow. Premium finish. Crafted to impress.",
		price: 1499,
		originalPrice: 2299,
		cta: { label: "Customize Yours", href: "/3d-lamps" },
		align: "center",
	},
	{
		id: "laptop-stands",
		image: "/premium-aluminum-laptop-stand-desk-setup.jpg",
		title: "Ergonomic Laptop Stands",
		subtitle: "Elevate your workspace with premium aluminum stands.",
		price: 1299,
		originalPrice: 1999,
		cta: { label: "Shop Stands", href: "/laptop-stands" },
		align: "left",
	},
	{
		id: "desk-mat",
		image: "/premium-desk-mat-gaming-workspace-setup.jpg",
		title: "Premium Desk Mats",
		subtitle: "Transform your desk with our extended gaming mats.",
		price: 899,
		originalPrice: 1499,
		cta: { label: "Explore Mats", href: "/desk-mats" },
		align: "right",
	},
	{
		id: "mouse-pad",
		image: "/custom-printed-mouse-pad-gaming-rgb.jpg",
		title: "Custom Printed Mouse Pads",
		subtitle: "Personalize your gaming setup with custom designs.",
		price: 499,
		originalPrice: 799,
		cta: { label: "Design Now", href: "/mouse-pads" },
		align: "center",
	},
	{
		id: "gaming-mouse",
		image: "/rgb-gaming-mouse-wireless-premium.jpg",
		title: "Pro Gaming Mice",
		subtitle: "Precision meets performance. Wireless freedom included.",
		price: 1799,
		originalPrice: 2499,
		cta: { label: "Shop Mice", href: "/gaming-mice" },
		align: "left",
	},
]

function ImageWithFallback(props) {
	const [src, setSrc] = useState(props.src)
	return (
		<img
			src={src || "/placeholder.svg"}
			alt={props.alt}
			className={props.className}
			onError={() => {
				setSrc("/premium-electronics-hero.jpg")
			}}
		/>
	)
}

export default function HeroCarousel() {
	const containerRef = useRef(null)
	const [index, setIndex] = useState(0)

	const goTo = (i) => {
		const el = containerRef.current
		if (!el) return
		const count = slides.length
		const next = (i + count) % count
		el.scrollTo({ left: el.clientWidth * next, behavior: "smooth" })
		setIndex(next)
	}

	// Auto-advance every 5s
	useEffect(() => {
		const id = setInterval(() => goTo(index + 1), 5000)
		return () => clearInterval(id)
	}, [index])

	// Sync index on manual scroll
	useEffect(() => {
		const el = containerRef.current
		if (!el) return
		let raf = 0
		const onScroll = () => {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)))
		}
		el.addEventListener("scroll", onScroll, { passive: true })
		return () => {
			el.removeEventListener("scroll", onScroll)
			cancelAnimationFrame(raf)
		}
	}, [])

	return (
		<section className="relative rounded-3xl overflow-hidden shadow-2xl">
			<div
				ref={containerRef}
				className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
				style={{ scrollbarWidth: "none" }}
			>
				{slides.map((s) => (
					<div
						key={s.id}
						className="snap-start shrink-0 w-full relative h-[500px] md:h-[500px]"
						style={{ aspectRatio: "16/9" }}
					>
						<ImageWithFallback
							src={s.image || "/placeholder.svg"}
							alt={s.title}
							className="w-full h-[500px] object-cover"
						/>
						<div className="absolute inset-0 bg-black/30" />

						{/* Brand gradient accent strip */}
						<div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${brandGradient}`} />

						{/* Text block */}
						<div
							className={[
								"absolute inset-0 flex items-center p-6 md:p-10",
								s.align === "left" && "justify-start",
								s.align === "center" && "justify-center",
								s.align === "right" && "justify-end",
							]
								.filter(Boolean)
								.join(" ")}
						>
							<div
								className={[
									"max-w-xl",
									s.align === "left" && "text-left",
									s.align === "center" && "text-center",
									s.align === "right" && "text-right",
								]
									.filter(Boolean)
									.join(" ")}
							>
								<div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white bg-white/15 backdrop-blur">
									<Sparkles className="w-4 h-4 text-white" />
									Premium Collection
								</div>

								<h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
									{s.title}
								</h2>
								{s.subtitle && (
									<p className="mt-2 md:mt-3 text-white/90 text-sm md:text-base">
										{s.subtitle}
									</p>
								)}

								{typeof s.price === "number" && (
									<div className="mt-4 inline-flex items-center gap-3 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg">
										<span className="text-gray-900 font-extrabold text-lg md:text-xl">
											₹ {s.price.toLocaleString()}
										</span>
										{s.originalPrice && (
											<span className="text-gray-500 line-through text-sm md:text-base">
												₹ {s.originalPrice.toLocaleString()}
											</span>
										)}
										{s.cta && (
											<Link to={s.cta.href}>
												<Button
													size="sm"
													className={`rounded-full text-white font-semibold px-4 py-2 bg-gradient-to-r ${brandGradient} hover:brightness-95`}
												>
													{s.cta.label}
												</Button>
											</Link>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Controls */}
			<button
				aria-label="Previous slide"
				onClick={() => goTo(index - 1)}
				className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 text-white items-center justify-center hover:bg-black/60"
			>
				<ChevronLeft className="w-5 h-5" />
			</button>
			<button
				aria-label="Next slide"
				onClick={() => goTo(index + 1)}
				className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 text-white items-center justify-center hover:bg-black/60"
			>
				<ChevronRight className="w-5 h-5" />
			</button>

			{/* Dots */}
			<div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2">
				{slides.map((_, i) => (
					<button
						key={i}
						aria-label={`Go to slide ${i + 1}`}
						onClick={() => goTo(i)}
						className={[
							"h-1.5 rounded-full transition-all",
							i === index
								? `w-10 bg-gradient-to-r ${brandGradient}`
								: "w-4 bg-white/60 hover:bg-white",
						].join(" ")}
					/>
				))}
			</div>
		</section>
	)
}
