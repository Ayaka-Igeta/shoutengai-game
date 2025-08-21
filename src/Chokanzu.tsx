import { Link } from 'react-router-dom';

function Chokanzu() {
  return (
    <div className="m-0 p-5 font-sans bg-gradient-to-br from-green-200 to-yellow-100 overflow-x-auto min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">
          🏪 商店街ゲーム 🏪
        </h1>
        
        <div className="flex justify-center gap-8 mb-8">
          {/* Trading Button */}
          <Link 
            to="/urikai" 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-full border-4 border-yellow-300 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">💰</span>
              <div className="text-center">
                <div className="text-xl font-black">売買ゲーム</div>
                <div className="text-sm">TRADING GAME</div>
              </div>
            </div>
          </Link>

          {/* Financial Game Button */}
          <Link 
            to="/financial" 
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-bold py-4 px-8 rounded-full border-4 border-red-300 shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div className="text-center">
                <div className="text-xl font-black">会計ゲーム</div>
                <div className="text-sm">BS/PL GAME</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">ゲーム選択</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 border-2 border-yellow-300 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-700 mb-2">💰 売買ゲーム</h3>
              <p className="text-sm text-gray-700">
                キャラクター同士でアイテムの売買を行い、取引の基本を学べるゲームです。
              </p>
            </div>
            <div className="text-center p-4 border-2 border-red-300 rounded-lg">
              <h3 className="text-lg font-bold text-red-700 mb-2">📊 会計ゲーム</h3>
              <p className="text-sm text-gray-700">
                商店街で買い物をしながら、貸借対照表(BS)と損益計算書(PL)を学べるゲームです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chokanzu;