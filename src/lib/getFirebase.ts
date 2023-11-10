import { getDownloadURL, getStorage, ref } from "@angular/fire/storage";

    
    const isValidHttpUrl = (string:string) => {
      let url;
      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    };
export const getFirebaseUrl = async (path: string) => {
    const storage = getStorage();
    if (isValidHttpUrl(path)) {
      return path; 
    }
    try {
      const pathReference = ref(storage, path);
      const result = await getDownloadURL(pathReference);
      console.log(result)
      return  result;
    } catch (error) {
      console.error(error);
      return ""; 
    }
  };