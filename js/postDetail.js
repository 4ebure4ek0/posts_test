document.addEventListener('DOMContentLoaded', () => {
    let postBlock = document.querySelector('.detail_post')
    let url = new URL(window.location.href)
    let id = url.searchParams.get('id')
    let posts = JSON.parse(localStorage.getItem('posts'))

    let post = posts[id-1]
    postBlock.innerHTML = `
        <h2 class="post_title">${post.title}</h2>
        <p class='text'>${post.text}</p>
        <span class="post_date_made"><strong>Дата создания:</strong> ${post.date_make}</span>
        <span class="post_date_edit"><strong>Дата редактирования:</strong> ${post.date_edit}</span>
    `
    console.log(post)
})