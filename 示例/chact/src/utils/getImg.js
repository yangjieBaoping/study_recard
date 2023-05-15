export default function getImg (file) {
    const img = new Image()
    const reader = new FileReader()
    reader.onload = function (e) {
        img.src = e.target.result
    }
    reader.readAsDataURL(file)
    return img
}