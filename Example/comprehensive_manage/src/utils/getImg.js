// 将file文件转化为图片
export const fileGetImg = (file) => {
  const img = new Image();
  const reader = new FileReader();
  reader.onload = function (e) {
    img.src = e.target.result;
  };
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.backgroundSize = "100%";
  img.style.backgroundRepeat = "no-repeat";
  reader.readAsDataURL(file);
  return img;
};
