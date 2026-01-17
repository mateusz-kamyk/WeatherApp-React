import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import type { ChartProps, CustomTooltipProps } from "../../types/generic";

export function HourlyTemperatureChart({ data }: ChartProps) {
    const unit = useSelector((state: RootState) => state.unit);
    const convertedData = data.map(d => ({
        ...d,
        temp: convertTemp(d.temp, unit)
    }));
    const temps = convertedData.map((d) => d.temp);
    const minTemp = Math.min(...temps) - 8;
    const maxTemp = Math.max(...temps) + 8;
   

    const generateTicks = (min: number, max: number, step: number) => {
        const ticks = [];
        let current = Math.floor(min);
    
        while (current <= max) {
          ticks.push(current);
          current += step;
        }
    
        return ticks;
      };
    
    const ticks = generateTicks(minTemp, maxTemp, 3);
    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (!active || !payload || payload.length === 0) return null;
      
        return (
          <div
            style={{
              background: "rgb(16, 25, 34)",
              fontSize: "16px",
              color: "white",
              opacity: "0.9",
              padding: "10px 12px",
              borderRadius: "16px",
            }}
          >
            <p style={{ margin: 0 }}>{label}</p>
            <p style={{ margin: 0 }}>{payload[0].value}°{unit}</p>
          </div>
        );
      };
    

    return (
        <div className="chart-container">
            <h3 className="chart-header">Prognoza temperatury</h3>
            <ResponsiveContainer style={{margin: 'auto'}} height={200} >
                <AreaChart data={convertedData}>
                <CartesianGrid stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="1 3" />
                <XAxis dataKey="hour" fontSize={13}/>
                <YAxis domain={[minTemp, maxTemp]} fontSize={13} ticks={ticks}/>
                <Tooltip content={<CustomTooltip />} />
                <defs>
                    <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fef08a" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#fef08a" stopOpacity={0.07} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="temp" stroke="#fef08a" fill="url(#tempFill)" baseValue={minTemp} strokeWidth={2.5}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}