const Chroma = require("./chroma.js");

// Initialize Chroma
Chroma.init(async () => {
    console.log("Chroma Editing Started");
    // SINGLE-USE: Set mouse color to Yellow (BGR Format)
    Chroma.createEffect("mouse", "CHROMA_STATIC", 0X00FFFF).then((effect) => {
        Chroma.setEffect(effect);
    });

    // MULTI-USE: Set mousepad color to Red (BGR Format)
    const mousepadEffect = await Chroma.createEffect("mousepad", "CHROMA_STATIC", 0X0000FF);
    Chroma.setEffect(mousepadEffect);

    // MULTI-USE: Set headset color to Blue (BGR Format)
    const headsetEffect = await Chroma.createEffect("headset", "CHROMA_STATIC", 0XFF0000);
    Chroma.setEffect(headsetEffect);

    // Stop Chroma after 5 Seconds
    setTimeout(() => {
        Chroma.uninit(() => {
            console.log("Chroma Editing Stopped");
        });
    }, 5000);
});
