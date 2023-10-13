import Image from 'next/image'
import React from 'react'

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-10 h-10 relative animate-pulse">
            <Image alt="logo" fill src="/logo.png"/>
        </div>

        <p className="text-sm text-muted-foreground">
            Your idea is being generated...
        </p>
    </div>
  )
}
