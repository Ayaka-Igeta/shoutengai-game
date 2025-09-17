// Lucide React
import { 
  Wallet, 
  Users, 
  TrendingUp, 
  Trophy,
  Store,
  Coffee,
  Laptop,
  Shirt,
  BookOpen,
  Gamepad2,
  Zap
} from 'lucide-react';

// Heroicons
import {
  WalletIcon,
  UsersIcon,
  ChartBarIcon,
  TrophyIcon,
  BuildingStorefrontIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const IconComparison = () => {
  const iconSets = [
    {
      name: 'Lucide React',
      description: 'モダンで美しい、軽量',
      icons: [
        { component: <Wallet className="w-8 h-8" />, name: '財布' },
        { component: <Users className="w-8 h-8" />, name: 'チーム' },
        { component: <TrendingUp className="w-8 h-8" />, name: '成長' },
        { component: <Trophy className="w-8 h-8" />, name: 'トロフィー' },
        { component: <Store className="w-8 h-8" />, name: 'ストア' },
        { component: <Coffee className="w-8 h-8" />, name: 'コーヒー' },
        { component: <Laptop className="w-8 h-8" />, name: 'ラップトップ' },
        { component: <Shirt className="w-8 h-8" />, name: 'シャツ' },
        { component: <BookOpen className="w-8 h-8" />, name: '本' },
        { component: <Gamepad2 className="w-8 h-8" />, name: 'ゲーム' },
        { component: <Zap className="w-8 h-8" />, name: 'エネルギー' }
      ]
    },
    {
      name: 'Heroicons',
      description: 'TailwindCSS公式チーム作成',
      icons: [
        { component: <WalletIcon className="w-8 h-8" />, name: '財布' },
        { component: <UsersIcon className="w-8 h-8" />, name: 'チーム' },
        { component: <ChartBarIcon className="w-8 h-8" />, name: 'チャート' },
        { component: <TrophyIcon className="w-8 h-8" />, name: 'トロフィー' },
        { component: <BuildingStorefrontIcon className="w-8 h-8" />, name: 'ストア' },
        { component: <Coffee className="w-8 h-8" />, name: 'コーヒー' },
        { component: <ComputerDesktopIcon className="w-8 h-8" />, name: 'PC' },
        { component: <Shirt className="w-8 h-8" />, name: 'シャツ' },
        { component: <BookOpenIcon className="w-8 h-8" />, name: '本' },
        { component: <PuzzlePieceIcon className="w-8 h-8" />, name: 'パズル' },
        { component: <BoltIcon className="w-8 h-8" />, name: 'ボルト' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-apple-gray-900 mb-2">🎨 アイコンライブラリ比較</h1>
        <p className="text-apple-gray-600">どちらのスタイルがお好みですか？</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {iconSets.map((set) => (
          <div key={set.name} className="bg-apple-gray-50/60 backdrop-blur-sm rounded-apple-lg shadow-sm border border-apple-gray-300/50 p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-2">{set.name}</h2>
              <p className="text-apple-gray-600 text-sm">{set.description}</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {set.icons.map((icon, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-3 rounded-apple bg-white/80 hover:bg-white transition-colors">
                  <div className="text-apple-gray-700 hover:text-vibrant-blue transition-colors">
                    {icon.component}
                  </div>
                  <span className="text-xs text-apple-gray-600 text-center">{icon.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/80 rounded-apple border border-apple-gray-300/50">
              <h3 className="font-bold text-apple-gray-900 mb-2">実装例:</h3>
              <code className="text-sm text-apple-gray-700 bg-apple-gray-100 p-2 rounded block">
                {set.name === 'Lucide React' 
                  ? 'import { Wallet } from "lucide-react";\n<Wallet className="w-6 h-6" />'
                  : 'import { WalletIcon } from "@heroicons/react/24/outline";\n<WalletIcon className="w-6 h-6" />'
                }
              </code>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-apple-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-2">🚀 次のステップ</h3>
          <p className="text-blue-100">
            お好みのアイコンライブラリを選んで、絵文字を置き換えましょう！
          </p>
        </div>
      </div>
    </div>
  );
};

export default IconComparison;