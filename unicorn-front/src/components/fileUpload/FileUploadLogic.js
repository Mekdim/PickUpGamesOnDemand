import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const storage = getStorage();

export const uploadImage = (file, setImageUrl, setProgress) => {
  const metadata = {
    contentType: file.type,
  };

  const storageRef = ref(storage, 'images/pitch/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    },
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageUrl(downloadURL);
      });
    }
  );
};
