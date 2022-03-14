const className = 'blog-post__body'
const blogPost = document.querySelector(`.${className}`)

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const headingSequence = []
const content = blogPost.childNodes[1].childNodes
const ulLevels = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']

content.forEach((item) => {
  if (item.tagName && headings.includes(item.tagName.toLowerCase())) {
    headingSequence.push(item)
  }
})

const getHeadingIndex = (sequenceIndex) => {
  return headings.indexOf(headingSequence[sequenceIndex].tagName.toLowerCase())
}

let level = 0

for (let i = 1; i <= headingSequence.length; i++) {
  let ul = document.querySelectorAll(`.content-table_${ulLevels[level]}`)
  ul = ul.length > 0 ? ul[ul.length - 1] : ul

  if (i !== 1) {
    const currentHeadingIndex = getHeadingIndex(i - 1)
    const prevHeadingIndex = getHeadingIndex(i - 2)

    if (currentHeadingIndex > prevHeadingIndex) {
      level++
      ul = document.createElement('ul')
      ul.classList.add(`content-table_${ulLevels[level]}`)
      const lastUlClass = document.querySelectorAll(`.content-table_${ulLevels[level - 1]}`)
      const lastUl = lastUlClass[lastUlClass.length - 1]
      lastUl.append(ul)
    } else if (currentHeadingIndex < prevHeadingIndex) {
      level = level - (prevHeadingIndex - currentHeadingIndex)

      level = level < 0 ? 0 : level

      const lastUlClass = document.querySelectorAll(`.content-table_${ulLevels[level]}`)
      ul = lastUlClass[lastUlClass.length - 1]
    }
  }

  const li = document.createElement('li')
  const a = document.createElement('a')
  a.innerText = `${i - 1} ${headingSequence[i - 1].innerText}`
  a.href = `#header${i - 1}`
  headingSequence[i - 1].setAttribute('id', `header${i - 1}`)
  li.append(a)
  ul.append(li)
}
