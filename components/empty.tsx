import React from 'react'
import Image from 'next/image'

interface EmptyProps {
    label: string;

}

export const Empty = ({label} : EmptyProps) => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <div className="relative">
            <Image alt="Empty" width={80} height={80} src="/empty.png" />
        </div>
        <p className='text-muted-foreground text-sm text-center'>
            {label}
        </p>
    </div>
  )
}
