import ViewShot from "react-native-view-shot";
import { useContext, useRef, useEffect } from 'react';
import { PrinterContext } from "../state/printReducer";

export default function ViewShotChildren({ children }) {
    const viewShotRef = useRef(null);
    const [printerState, dispatchPrinterState] = useContext(PrinterContext);
    console.log({ printerState, PrinterContext })

    useEffect(() => {
        console.log({ printerState })
        if (printerState.takeScreenShot) {
            viewShotRef.current.capture().then((jpgScreenShotUrl) => {
                console.log('do something with ', jpgScreenShotUrl);
                console.log({ printerState })
                dispatchPrinterState({ type: 'SAVE_URL', payload: { jpgScreenShotUrl } })
            });
        }
    }, [printerState.takeScreenShot]);

    return (
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            {children}
        </ViewShot>
    );
}