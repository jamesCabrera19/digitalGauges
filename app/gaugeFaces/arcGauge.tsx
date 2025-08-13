import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

// shared // shared
type gaugeProps = {
    temperatureProgress: number;
    fontWeight: number;
    colors: string[];
    actualTemperature: number;
    operatingLimit: number;
};

const getFontSize = (size: number) => {
    let fontWeight = 0;
    if (size === 3) {
        fontWeight = 500;
    } else if (size === 2) {
        fontWeight = 100;
    } else {
        fontWeight = 600;
    }
    return fontWeight;
};

const ArcGauge = ({
    temperatureProgress,
    actualTemperature,
    fontWeight,
    colors,
    operatingLimit,
}: gaugeProps) => {
    const [backgroundColor, secondaryColor, fontColor] = colors;
    // colors[1] is actually the font color. wee need to add an additional row of colors.

    return (
        <Gauge
            // cx={0}
            // cy={'3%'}
            outerRadius={'90%'} // size increase
            width={200}
            height={200}
            value={temperatureProgress}
            startAngle={-95}
            endAngle={95}
            // percentage based value
            // text={({ value }) => `${value}`}

            // percentage based value / max value
            // text={({ value, valueMax }) => `${value} / ${valueMax}`}

            // actual value
            text={() => `${actualTemperature}°`}
            sx={{
                // background (reference) arc
                [`& .${gaugeClasses.referenceArc}`]: {
                    // override color if temperature is more than the range
                    fill:
                        actualTemperature > operatingLimit
                            ? '#ff1a1a'
                            : secondaryColor, //'#e0e0e0', // white part,(right)
                },
                // foreground (value) arc
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: backgroundColor, //'#0076ec', // green value arc (left)
                },
                // target the center-value <text> element
                [`& .${gaugeClasses.valueText} text`]: {
                    fontSize: '32px', // make the number bigger
                    fill:
                        actualTemperature > operatingLimit
                            ? '#ff1a1a'
                            : fontColor,
                    fontWeight:
                        actualTemperature > operatingLimit
                            ? 600
                            : getFontSize(fontWeight), // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

export default ArcGauge;
