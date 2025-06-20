import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

type gaugeProps = {
    temperature: number;
    needleSize: number;
    colors: string[];
};

const RoundGauge = ({ temperature, needleSize, colors }: gaugeProps) => {
    let weight = 0;

    if (needleSize === 3) {
        weight = 500;
    } else if (needleSize === 2) {
        weight = 100;
    } else {
        weight = 600;
    }

    const [backgroundColor, secondaryColor, fontColor] = colors;

    return (
        <Gauge
            width={200}
            height={200}
            value={temperature}
            valueMin={0}
            valueMax={300}
            startAngle={-180} // must be match and opposite of endAngle
            endAngle={180}
            text={({ value }) => `${value}`}
            sx={{
                // background (reference) arc
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: backgroundColor, // white part,(right)
                },
                // foreground (value) arc
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: secondaryColor, // green value arc (left)
                },
                [`& .${gaugeClasses.valueText} text`]: {
                    fontSize: '32px', // make the number bigger
                    fill: fontColor, // (optional) change color
                    fontWeight: weight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

export default RoundGauge;
