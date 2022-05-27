import * as Print from 'expo-print';
import React, { useReducer, createContext } from "react";
import { Asset } from 'expo-asset';
import { printAsync } from 'expo-print';
import { manipulateAsync } from 'expo-image-manipulator';
const initialState = {
    takeScreenShot: false,
    jpgScreenShotUrl: null,
    printerForIOS: null,
}

// export const PrintContext = createContext();
// export const { Consumer: PrintContextConsumer, Provider: PrintContextProvider } = PrintContext;

export const PrinterContext = createContext();

async function generateHTML(fileUrl) {
    if (fileUrl) {
        const asset = Asset.fromModule(require(`${fileUrl}`));
        const image = await manipulateAsync(
            asset.localUri ?? asset.uri,
            [],
            { base64: true }
        );
        return `
      <html>
        <img
          src="data:image/jpeg;base64,${image.base64}"
          style="width: 90vw;" />
      </html>
    `;
    }
}

function printerReducer(state, action) {
    switch (action.type) {
        case 'SELECT_PRINTER_IF_IOS': {
            return { ...state, printerForIOS: action.payload.printerForIOS }
        }
        case 'ALLOW_SCREENSHOT': {
            console.log({ state })
            return { ...state, takeScreenShot: true }
        }
        case 'NO_SCREENSHOT': {
            console.log({ state })
            return { ...state, takeScreenShot: false }
        };
        case 'SAVE_URL': {
            console.log({ state, action })

            const html = generateHTML(action.payload.jpgScreenShotUrl).then((data) =>
                printAsync({ data }))
            return { ...state, jpgScreenShotUrl: action.payload.jpgScreenShotUrl }
            // Print.printAsync({
            //     html: `
            //     <html>

            //     </html>`,
            //     // printerUrl: state.printerForIOS?.url,
            //     // iOS only 
            // })
            //     .then((data) => {


            //     })
            //     .catch((err) => { console.log({ err }) });
        };
        default: throw new Error('Error Reducer');
    }
}
export let AppProvider = ({ children }) => {
    //   const [printerState, dispatchPrintState] = useReducer(printerReducer, initialState);
    const [printerState, dispatchPrinterState] = useReducer(printerReducer, initialState);
    return (
        //             <PrintContextProvider value={[printState, dispatchPrintState]}>

        <PrinterContext.Provider value={[printerState, dispatchPrinterState]}>
            {children}
        </PrinterContext.Provider>
    );
};