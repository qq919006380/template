'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '../i18n/navigation'
import { usePathname } from 'next/navigation'
import { Globe, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const localeNames = {
  en: { name: 'English', flag: '🇺🇸' },
  zh: { name: '中文', flag: '🇨🇳' }
}

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 关闭下拉菜单当点击外部时
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 获取当前路径，去除语言前缀
  const getLocalizedPath = () => {
    return pathname.replace(`/${locale}`, '') || '/'
  }

  const currentLocale = localeNames[locale as keyof typeof localeNames]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:flex items-center gap-1">
          <span>{currentLocale?.flag}</span>
          <span>{currentLocale?.name}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in slide-in-from-top-1 duration-200">
          {Object.entries(localeNames).map(([localeCode, info]) => {
            const isActive = locale === localeCode
            
            return (
              <Link
                key={localeCode}
                href={getLocalizedPath()}
                locale={localeCode}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-pink-50 ${
                  isActive 
                    ? 'bg-pink-50 text-pink-600 font-medium' 
                    : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">{info.flag}</span>
                <span>{info.name}</span>
                {isActive && (
                  <span className="ml-auto">
                    <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
} 