import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

// shared // shared
type gaugeProps = {
    temperature: number;
    needleSize: number;
    colors: string[];
};

const ArcGauge = ({ needleSize, temperature, colors }: gaugeProps) => {
    let weight = 400;
    if (needleSize === 3) {
        weight = 500;
    } else if (needleSize === 2) {
        weight = 100;
    } else {
        weight = 600;
    }
    // colors[1] is actually the font color. wee need to add an additional row of colors.
    return (
        <Gauge
            width={200}
            height={200}
            value={temperature}
            startAngle={-90}
            endAngle={90}
            text={({ value }) => `${value}`}
            sx={{
                // background (reference) arc
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: colors[0], //'#e0e0e0', // white part,(right)
                },
                // foreground (value) arc
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: colors[1], //'#0076ec', // green value arc (left)
                },
                // target the center-value <text> element
                [`& .${gaugeClasses.valueText} text`]: {
                    fontSize: '32px', // make the number bigger
                    fill: '#fff',
                    fontWeight: weight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

export default ArcGauge;
