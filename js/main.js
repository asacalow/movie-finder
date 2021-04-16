// DOM manipulation 101: the window load event
window.addEventListener("load", _ => {
  // console.log("Up and running.") // << yep.
  const sf = document.querySelector("#search-form") // << DOM 101: query selectors
  const s = document.querySelector("#search")
  const sr = document.querySelector("#search-results")
  const key = '<insert API key here>'

  // hook into the form submit event. <what's an event listener? etc.>
  sf.addEventListener("submit", async event => {
    // using async/await because these functions return Promises
    // note use of CORS <what's a CORS etc.>
    const response = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=${key}&query=${s.value}`, {mode: 'cors'})
    // watewhuut? so yes, the response object is in fact a Stream object. <what is a stream? etc.>
    const data = await response.json()
    // so much DOM 101
    sr.innerHTML = ''
    data.results.forEach(r => {
      const a = document.createElement('article')
      // template literals ftw. Also, appropriate semantic HTML. (Articles are weird but great, discush here: https://www.smashingmagazine.com/2020/01/html5-article-section/)
      a.innerHTML = `<header><h1>${r.title} (${r.release_date})</h1></header><details>${r.overview}</details>`
      sr.appendChild(a)
    })
    // feature klaxon! this prevents the form from actually submitting and making a POST request as it normally would
    event.preventDefault()
  })
})