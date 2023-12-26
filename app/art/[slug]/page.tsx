// import { useRouter } from 'next/router'
import React from 'react'
import Page from '../../page'

// export default function IndexPage() {
//   const router = useRouter()
//   const slug = router.query.slug as string

//   return (
//     <>
//       <h1>Art: {slug}</h1>
//     </>
//   )
// }

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Page>
      <h1>My Page</h1>
    </Page>
  )
}