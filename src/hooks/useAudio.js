import Sound from "react-native-sound"
Sound.setCategory("Playback")

const useAudio = (file) => {

    let sound = new Sound(file, null, (err) =>{
        if (err) {
            console.log("HATA VAR : ", err)
        }
    })

    return sound;
}

export default useAudio;