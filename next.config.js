const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = {
  reactStrictMode: true,
  // ...withMDX({
  //   pageExtension: ['js', 'jsx', 'mdx']
  // })
}