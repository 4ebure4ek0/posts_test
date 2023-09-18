document.addEventListener('DOMContentLoaded', () => {
    let date = new Date()
    let posts = []
    let postsBlock = document.querySelector('.posts_block')
    let addForms = document.querySelectorAll('.add_form')
    let addBtn = document.querySelector('.add_btn')

    let lastId = 0
    let newPost = {
        title: '',
        text: ''
    }

    posts = JSON.parse(localStorage.getItem('posts'))
    if (!posts) {
        localStorage.setItem('posts', JSON.stringify([
            {
                "id": 1,
                "title": "Первый текст",
                "text": "Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки новых предложений. Задача организации, в особенности же начало повседневной работы по формированию позиции требуют от нас анализа системы обучения кадров, соответствует насущным потребностям. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание направлений прогрессивного развития. Повседневная практика показывает, что консультация с широким активом требуют определения и уточнения модели развития.",
                "date_make": "13.09.2023",
                "date_edit": "13.09.2023"
            },
            {
                "id": 2,
                "title": "Второй текст",
                "text": "Товарищи! реализация намеченных плановых заданий в значительной степени обуславливает создание направлений прогрессивного развития. Идейные соображения высшего порядка, а также реализация намеченных плановых заданий способствует подготовки и реализации форм развития. Таким образом реализация намеченных плановых заданий в значительной степени обуславливает создание направлений прогрессивного развития. Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании форм развития. Равным образом укрепление и развитие структуры представляет собой интересный эксперимент проверки модели развития.",
                "date_make": "14.09.2023",
                "date_edit": "13.09.2023"
            }
        ]))
    }

    let allPosts = ''
    posts.forEach(post => {
        allPosts += `            
            <a href='/postDetail.html?id=${post.id}' class="post_item" data-id='${post.id}'>
                <h2 class="post_title">${post.title}</h2>
                <span class="post_date_made"><strong>Дата создания:</strong> ${post.date_make}</span>
                <span class="post_date_edit"><strong>Дата редактирования:</strong> ${post.date_edit}</span>
                <button class="edit_btn">
                    <img src="img/edit.png" alt="Редактировать">
                </button>
                <div class="edit_form">
                    <div class="edit_form_block">
                        <input class="edit_item edit_text" type="text" name="title" placeholder="Заголовок">
                        <Textarea class="edit_item edit_text" name='text' placeholder="Текст"></Textarea>
                        <button class="edit_item edit_submit_btn">Добавить пост</button>
                    </div>
                </div>
            </a>
            `
        lastId = post.id
    });
    postsBlock.innerHTML = allPosts

    let postBlocks = document.querySelectorAll('.post_item')
    postBlocks.forEach((postBlock) => {
        let editBtn = postBlock.querySelector('.edit_btn')
        let editForm = postBlock.querySelector('.edit_form')
        let submit = postBlock.querySelector('.edit_submit_btn')
        editBtn.onclick = () => {
            let post = posts[postBlock.dataset.id-1]
            editForm.classList.toggle('open')
            editForm.querySelectorAll('.edit_text').forEach((input) => {
                input.value = post[input.name]
                input.oninput = () => {
                    posts[postBlock.dataset.id-1][input.name] = input.value
                    posts[postBlock.dataset.id-1]['date_edit'] = date.toLocaleDateString()
                }
            })
            submit.onclick = () => {
                localStorage.setItem('posts', JSON.stringify(posts))
                window.location.href = '/'
            }
        }
        editForm.onclick = (e) => {
            if (e.target.classList.contains('edit_form')) {
                editForm.classList.remove('open')
            }
        }
    })

    addForms.forEach((addForm) => {
        addForm.oninput = (e) => {
            newPost[e.target.name] = e.target.value
        }
    })
    addBtn.onclick = () => {
        posts.push({ id: ++lastId, ...newPost, date_make: date.toLocaleDateString(), date_edit: date.toLocaleDateString() })
        localStorage.setItem('posts', JSON.stringify(posts))
        window.location.href = '/'
    }
})