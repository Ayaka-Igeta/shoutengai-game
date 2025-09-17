import { Link } from 'react-router-dom';

function Chokanzu() {
  return (
    <div className="min-h-screen bg-apple-gray-50 p-6 font-sf">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-apple-gray-900 mb-4 tracking-tight">
            BUYBUY GAME
          </h1>
          <p className="text-xl text-apple-gray-600 font-medium">
            楽しみながら学ぶ金融リテラシー
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Trading Button */}
          <Link 
            to="/urikai" 
            className="group relative bg-white hover:bg-apple-gray-50 p-8 rounded-apple-lg border border-apple-gray-200 shadow-apple hover:shadow-apple-hover transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
                💰
              </div>
              <div>
                <h3 className="text-2xl font-bold text-apple-gray-900 mb-2">BUYBUY GAME</h3>
                <p className="text-apple-gray-600 font-medium mb-1">TRADING GAME</p>
                <p className="text-sm text-apple-gray-500 leading-relaxed">
                  キャラクター同士でアイテムの売買を行い、<br />取引の基本を学べるゲームです。
                </p>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 text-apple-gray-400 group-hover:text-apple-blue transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </Link>

          {/* Financial Game Button */}
          <Link 
            to="/financial" 
            className="group relative bg-white hover:bg-apple-gray-50 p-8 rounded-apple-lg border border-apple-gray-200 shadow-apple hover:shadow-apple-hover transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>
              <div>
                <h3 className="text-2xl font-bold text-apple-gray-900 mb-2">会計ゲーム</h3>
                <p className="text-apple-gray-600 font-medium mb-1">BS/PL GAME</p>
                <p className="text-sm text-apple-gray-500 leading-relaxed">
                  商店街で買い物をしながら、<br />貸借対照表と損益計算書を学べるゲームです。
                </p>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 text-apple-gray-400 group-hover:text-apple-blue transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-apple p-8 rounded-apple-lg border border-apple-gray-200 shadow-apple">
          <h2 className="text-2xl font-bold text-center mb-6 text-apple-gray-900">学習内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-apple-gray-900 mb-2">売買取引の基礎</h3>
                <p className="text-apple-gray-600 text-sm leading-relaxed">
                  需要と供給、価格設定、交渉スキルなど、ビジネスの基本となる売買取引について実践的に学習できます。
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-apple-gray-900 mb-2">財務諸表の理解</h3>
                <p className="text-apple-gray-600 text-sm leading-relaxed">
                  貸借対照表（BS）と損益計算書（PL）の読み方と作成方法を、実際の取引を通して体験的に学習できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chokanzu;