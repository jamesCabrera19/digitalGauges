import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

// shared // shared
type gaugeProps = {
    temperature: number;
    fontWeight: number;
    colors: string[];
};

const ArcGauge = ({ fontWeight, temperature, colors }: gaugeProps) => {
    let weight = 0;
    if (fontWeight === 3) {
        weight = 500;
    } else if (fontWeight === 2) {
        weight = 100;
    } else {
        weight = 600;
    }
    const [backgroundColor, secondaryColor, fontColor] = colors;
    // colors[1] is actually the font color. wee need to add an additional row of colors.
    return (
        <Gauge
            // cx={0}
            // cy={'3%'}
            outerRadius={'90%'} // size increase
            width={200}
            height={200}
            value={temperature}
            startAngle={-95}
            endAngle={95}
            text={({ value }) => `${value}`}
            sx={{
                // background (reference) arc
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: backgroundColor, //'#e0e0e0', // white part,(right)
                },
                // foreground (value) arc
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: secondaryColor, //'#0076ec', // green value arc (left)
                },
                // target the center-value <text> element
                [`& .${gaugeClasses.valueText} text`]: {
                    fontSize: '32px', // make the number bigger
                    fill: fontColor,
                    fontWeight: weight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

export default ArcGauge;
