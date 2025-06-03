import { Nunito, Fredoka, Comfortaa, Quicksand } from "next/font/google"

// 主要字体 - Nunito (圆润可爱，适合Labubu)
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
})

// 备选字体1 - Fredoka (更加圆润可爱)
const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600"],
})

// 备选字体2 - Comfortaa (温柔圆润)
const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa",
  weight: ["300", "400", "500", "600", "700"],
})

// 备选字体3 - Quicksand (现代圆润)
const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
})

export { nunito, fredoka, comfortaa, quicksand }
