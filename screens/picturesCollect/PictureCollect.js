// import { CameraComponent } from "../picturesCollect/Camera";
// import {getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from 'firebase/storage'


// let url = ""
// try{
//   const storage = getStorage();
//   // const ref = ref(storage, 'image.png');
//   let name = team + ".jpg"
//   const reference = ref(storage, name)
//   // const img = await fetch(image);
//   // const bytes = 
//   const img = await fetch(image);
//   const bytes = await img.blob();
//   await uploadBytesResumable(reference, bytes)
//   url = (await getDownloadURL(reference)).toString()
//   console.log(url)
//   }
//   catch(e){
//     console.log(e)
//   }

// <CameraComponent 
// image={image}
// setImage = {setImage}
// />