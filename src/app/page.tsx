import { DoughnutChart } from "@/components/DoughnutChart";
import styles from "./page.module.scss";
import { ChartItem } from "@/interfaces/ChartInterfaces";
import { ColorsContextProvider } from "@/hooks/useColors";

export default function Home() {

  const outcomes: ChartItem[] = [
    {
      title: 'Parcela PC',
      category: 'Cartão',
      value: 1200,
      color: 'red'
    },
    {
      title: 'Cont de luz',
      category: 'Despesas',
      value: 120,
      color: 'darkgreen'
    },
  ];

  return (
    <ColorsContextProvider>
      <div>
        <DoughnutChart data={outcomes} label="Gastos mensais" title="Gastos mensais por categoria"/>
      </div>
    </ColorsContextProvider>
  );
}
