import { ConfiguratorProvider } from '@/lib/context/ConfiguratorContext';
import ConfiguratorApp from '@/components/ConfiguratorApp';

export default function Home() {
  return (
    <ConfiguratorProvider>
      <ConfiguratorApp />
    </ConfiguratorProvider>
  );
}
