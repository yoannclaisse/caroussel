// Setting
const $container = document.querySelector('.container')
const $images = [...$container.querySelectorAll('.small-image')]
const $titles = [...$container.querySelectorAll('.title')]
const $titleTranslate = $container.querySelector('.titles')
const $firstAction = document.querySelector('.first-action')
const $buttonHome = $firstAction.querySelector('.button')
const $sentence = $firstAction.querySelector('.sentence')
const $background = $firstAction.querySelector('.background')
const $cursorElement = document.querySelector('.cursor')
const $filter = $cursorElement.querySelector('.filter')

let sliderIndex = $images.length - $images.length

// sounds
const sounds = [
    new Audio('./sources/sounds/spray.mp3'),
    new Audio('./sources/sounds/shake.mp3')
]

// dom loaded for first action
document.addEventListener('DOMContentLoaded', (event) =>
{
    $buttonHome.style.display = 'block'
    $sentence.style.display = 'block'
    $background.style.display = 'block'
})

// click for first action
$buttonHome.addEventListener('click', () =>
{
    $buttonHome.style.display = 'none'
    $sentence.style.display = 'none'
    $background.style.display = 'none'
    $images[0]
})

// cursor
window.addEventListener('mousemove', (event) => 
{
    $cursorElement.style.transform = `translate(${event.clientX - 15}px, ${event.clientY - 15}px)`
})

// listen to the wheel
document.addEventListener('wheel', (event) =>
{
    const deltaY = event.deltaY
    const sound = sounds[1]
    sound.currentTime = 0

    // Update sliderIndex
    if(deltaY > 0)
    {
        sliderIndex++
        sound.play()
    }

    if(deltaY < 0)
    {
        sliderIndex--
        sound.play()
    }

    if(sliderIndex == $images.length)
    {
        sliderIndex = $images.length - 1
        sound.pause()
    }

    if(sliderIndex <= $images.length - $images.length)
    {
        sliderIndex = $images.length - $images.length
        sound.pause()
    }

    // In array add and remove class for title
    $titles.forEach(($title, index) => 
    {
        if(index > sliderIndex)
        {
            $title.classList.add('is-after')
            $title.classList.add('title-up')
            $title.classList.remove('is-current')
            $title.classList.remove('is-before')
            $title.classList.remove('title-down')
        }

        if(index < sliderIndex)
        {
            $title.classList.add('is-before')
            $title.classList.add('title-down')
            $title.classList.remove('is-after')
            $title.classList.remove('is-current')
            $title.classList.remove('title-up')
        }

        if(index == sliderIndex)
        {
            $title.classList.add('is-current')
            $title.classList.remove('is-before')
            $title.classList.remove('is-after')
        }

        if($title.classList.contains('is-before') || $title.classList.contains('is-after'))
        {
            $title.style.display='none'
        }

        if($title.classList.contains('is-current'))
        {
            $title.style.display='block'
        }
    })
    // In array add and remove class for image
    $images.forEach(($image, index) =>
    {
        if(index > sliderIndex)
        {
            $image.classList.add('is-after')
            $image.classList.remove('is-current')
            $image.classList.remove('is-before')
        }

        if(index < sliderIndex)
        {
            $image.classList.add('is-before')
            $image.classList.remove('is-after')
            $image.classList.remove('is-current')
        }

        if(index == sliderIndex)
        {
            $image.classList.add('is-current')
            $image.classList.remove('is-before')
            $image.classList.remove('is-after')
        }

        if($image.classList.contains('big-image'))
        {
            sound.pause()
        }
        
    })
})

// listen to the keydown
document.addEventListener('keydown', (event) =>
{
    const code = event.code
    const sound = sounds[1]
    sound.currentTime = 0
    

    // Update sliderIndex
    if(code == 'ArrowDown')
    {
        sliderIndex++
        sound.play()
    }

    if(code == 'ArrowUp')
    {
        sliderIndex--
        sound.play()
    }

    if(sliderIndex == $images.length)
    {
        sliderIndex = $images.length - 1
        sound.pause()
    }

    if(sliderIndex <= $images.length - $images.length)
    {
        sliderIndex = $images.length - $images.length
        sound.pause()
    }

    // In array add and remove class for title
    $titles.forEach(($title, index) => 
    {
        if(index > sliderIndex)
        {
            $title.classList.add('is-after')
            $title.classList.add('title-up')
            $title.classList.remove('is-current')
            $title.classList.remove('is-before')
            $title.classList.remove('title-down')
        }

        if(index < sliderIndex)
        {
            $title.classList.add('is-before')
            $title.classList.add('title-down')
            $title.classList.remove('is-after')
            $title.classList.remove('is-current')
            $title.classList.remove('title-up')
        }

        if(index == sliderIndex)
        {
            $title.classList.add('is-current')
            $title.classList.remove('is-before')
            $title.classList.remove('is-after')
        }

        if($title.classList.contains('is-before') || $title.classList.contains('is-after'))
        {
            $title.style.display='none'
        }

        if($title.classList.contains('is-current'))
        {
            $title.style.display='block'
        }
    })

    // In array add and remove class for image and big-image
    $images.forEach(($image, index) =>
    {
        
        if(index > sliderIndex)
        {
            $image.classList.add('is-after')
            $image.classList.remove('is-current')
            $image.classList.remove('is-before')
        }

        if(index < sliderIndex)
        {
            $image.classList.add('is-before')
            $image.classList.remove('is-after')
            $image.classList.remove('is-current')
        }

        if(index == sliderIndex)
        {
            $image.classList.add('is-current')
            $image.classList.remove('is-before')
            $image.classList.remove('is-after')
        }
        if($image.classList.contains('big-image'))
        {
            sound.pause()
        }

        if(code == 'Enter' && $image.classList.contains('is-current'))
        {
            const sound = sounds[0]
            sound.currentTime = 0
            sound.play()
            $image.classList.remove('small-image')
            $image.classList.add('big-image')
            $image.classList.remove('is-current')
            $image.classList.remove('is-before')
            $image.src = `./sources/images/${index}-big.jpg`
            $titleTranslate.style.transform = 'translateX(-300px)'
            $titleTranslate.style.transition = '0.5s ease-in-out 0s'
            sliderIndex = undefined
        }

        else if(code == 'Escape' && $image.classList.contains('big-image'))
        {
            $image.classList.add('small-image')
            $image.classList.remove('big-image')
            $image.classList.add('is-current')
            $image.src = `./sources/images/${index}.jpg`
            sliderIndex = index
            $titleTranslate.style.transform = 'translateX(0px)'
            $titleTranslate.style.transitionDuration = '0.5s ease-in-out 0s'
        }
    })
})

// click for big image
$images.forEach(($image, index) =>
{

    $image.addEventListener('click', () =>
    {
        const sound = sounds[0]
        sound.currentTime = 0
        sound.play()
        if($image.classList.contains('is-current'))
        {
            $image.classList.remove('small-image')
            $image.classList.add('big-image')
            $image.classList.remove('is-current')
            $image.classList.remove('is-before')
            $image.src = `./sources/images/${index}-big.jpg`
            sliderIndex = undefined
            $titleTranslate.style.transform = 'translateX(-200px)'
            $titleTranslate.style.transition = '0.5s ease-in-out 0s'
        }

        else if($image.classList.contains('is-before'))
        {
            $image.classList.remove('is-current')
        }

        else if ($image.classList.contains('is-after'))
        {
            $image.classList.remove('is-current')
        }

        else
        {
            $image.classList.add('small-image')
            $image.classList.remove('big-image')
            $image.classList.add('is-current')
            $image.src = `./sources/images/${index}.jpg`
            sliderIndex = index
            $titleTranslate.style.transform = 'translateX(0px)'
            $titleTranslate.style.transition = '0.5s ease-in-out 0s'
        }
    })

    $image.addEventListener('mouseenter', (event) =>
    {
        $cursorElement.classList.remove('cursor')
        $cursorElement.classList.add('cursor-hover')
    })

    $image.addEventListener('mouseleave', (event) =>
    {
        $cursorElement.classList.remove('cursor-hover')
        $cursorElement.classList.add('cursor')
    })
})
// cursor for home
$buttonHome.addEventListener('mouseenter', (event) =>
    {
        $cursorElement.classList.remove('cursor')
        $cursorElement.classList.add('cursor-hover')
    })

$buttonHome.addEventListener('mouseleave', (event) =>
    {
        $cursorElement.classList.remove('cursor-hover')
        $cursorElement.classList.add('cursor')
    })



