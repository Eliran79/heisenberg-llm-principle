import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { allUseCases, defaultSelectedUseCases } from './useCaseData';

const RadarChartVisualization = () => {
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(defaultSelectedUseCases);
  const [expandedPrompts, setExpandedPrompts] = useState<{[key: string]: boolean}>({});
  
  // Get the selected use cases data
  const useCases = allUseCases.filter(useCase => 
    selectedUseCases.includes(useCase.name)
  );

  const handleUseCaseToggle = (useCaseName: string) => {
    setSelectedUseCases(prev => {
      if (prev.includes(useCaseName)) {
        // Don't allow removing if it would leave less than 1 use case
        if (prev.length <= 1) return prev;
        return prev.filter(name => name !== useCaseName);
      } else {
        // Don't allow adding more than 9 use cases (3x3 grid)
        if (prev.length >= 9) return prev;
        return [...prev, useCaseName];
      }
    });
  };

  const togglePrompt = (useCaseName: string) => {
    setExpandedPrompts(prev => ({
      ...prev,
      [useCaseName]: !prev[useCaseName]
    }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            The Uncertainty Principle of Large Language Models
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            Fundamental Trade-offs in AI Systems
          </p>
          
          {/* Theoretical Introduction */}
          <div className="max-w-4xl mx-auto text-left bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Just as Heisenberg's Uncertainty Principle reveals that you cannot simultaneously know both the position and momentum of a particle with perfect precision, Large Language Models (LLMs) face their own fundamental uncertainty relationships. These aren't mere engineering challenges to be solved, but <span className="text-blue-300 font-semibold">information-theoretic limits</span> that create unavoidable trade-offs between competing objectives in AI systems.
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-6">The Four Pillars of LLM Uncertainty</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">
                  1. Precision vs. Creativity
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The more precisely you constrain a model for factual accuracy, the less creative and novel its outputs become. Models optimized for creativity often sacrifice factual reliability.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-green-300 mb-3">
                  2. Memorization vs. Generalization
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The more precisely an LLM memorizes its training data, the less precisely it can generalize to unseen situations. This represents a fundamental information-theoretic trade-off.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-yellow-300 mb-3">
                  3. Context Breadth vs. Attention Depth
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Models with longer context windows must distribute their finite "attention resolution" across more information, leading to less precise focus on specific details.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">
                  4. Confidence vs. Calibration
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Models that express high confidence often become poorly calibrated. Well-calibrated models that appropriately express uncertainty may seem less decisive.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-slate-300 mb-6">
            Interactive Radar Analysis of {useCases.length} Selected Use Cases
          </p>
          
          {/* Use Case Selector */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Select Use Cases to Compare (Max 9)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {allUseCases.map((useCase) => (
                <button
                  key={useCase.name}
                  onClick={() => handleUseCaseToggle(useCase.name)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedUseCases.includes(useCase.name)
                      ? 'bg-blue-600 text-white border-2 border-blue-400'
                      : 'bg-white/10 text-slate-300 border-2 border-transparent hover:bg-white/20 hover:text-white'
                  }`}
                  disabled={!selectedUseCases.includes(useCase.name) && selectedUseCases.length >= 9}
                >
                  {useCase.shortName}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-3">
              Selected: {selectedUseCases.length}/9 | 
              Click to add/remove use cases from the visualization below
            </p>
          </div>
          <div className="flex justify-center space-x-8 text-sm text-slate-400 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              <span>Precision vs Creativity (1=Precision, 10=Creativity)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span>Memory vs General (1=Memorization, 10=Generalization)</span>
            </div>
          </div>
          <div className="flex justify-center space-x-8 text-sm text-slate-400 mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span>Context vs Depth (1=Deep Focus, 10=Broad Context)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
              <span>Confidence vs Calib (1=High Confidence, 10=High Calibration)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Grid of Radar Charts */}
        <div className={`grid gap-6 ${
          useCases.length <= 3 ? 'grid-cols-1 md:grid-cols-3' :
          useCases.length <= 6 ? 'grid-cols-2 md:grid-cols-3' :
          'grid-cols-2 md:grid-cols-3'
        }`}>
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-1">
                  {useCase.shortName}
                </h3>
                <p className="text-sm text-slate-300">
                  {useCase.description}
                </p>
              </div>

              {/* Radar Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={useCase.data}>
                    <PolarGrid 
                      stroke="rgba(255,255,255,0.2)" 
                      strokeWidth={1}
                    />
                    <PolarAngleAxis 
                      dataKey="factor" 
                      tick={{ 
                        fill: 'white', 
                        fontSize: 10,
                        fontWeight: 'bold'
                      }}
                      className="text-xs"
                    />
                    <PolarRadiusAxis
                      domain={[0, 10]}
                      tick={{ 
                        fill: 'rgba(255,255,255,0.6)', 
                        fontSize: 8 
                      }}
                      tickCount={6}
                    />
                    <Radar
                      name={useCase.shortName}
                      dataKey="value"
                      stroke={useCase.color}
                      fill={useCase.color}
                      fillOpacity={0.2}
                      strokeWidth={3}
                      dot={{ 
                        fill: useCase.color, 
                        strokeWidth: 2, 
                        stroke: 'white',
                        r: 4 
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Values Display */}
              <div className="mt-4 space-y-1">
                {useCase.data.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 truncate">
                      {item.factor}:
                    </span>
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden mr-2"
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(item.value / 10) * 100}%`,
                            backgroundColor: useCase.color
                          }}
                        />
                      </div>
                      <span className="text-white font-bold w-6 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optimized Prompt Section */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <button
                  onClick={() => togglePrompt(useCase.name)}
                  className="flex items-center justify-between w-full text-left text-xs text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <span className="font-medium">Optimized Prompt</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${expandedPrompts[useCase.name] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedPrompts[useCase.name] && (
                  <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs text-slate-300 leading-relaxed mb-3 max-h-24 overflow-y-auto">
                      {useCase.optimizedPrompt}
                    </div>
                    <button
                      onClick={() => copyToClipboard(useCase.optimizedPrompt)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs rounded-md transition-colors border border-blue-500/30"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Prompt
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empirical Patterns and Insights */}
        <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Empirical Patterns Across Domains
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-red-300 mb-3">
                🎯 Safety-Critical Clustering
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Applications involving medical diagnosis, legal contracts, mathematical proofs, and safety systems consistently require <strong>maximum precision and calibration</strong> while accepting minimal creativity. These domains cannot tolerate the uncertainty that enables creative output.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-3">
                🎨 Creative Domain Inversion
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Poetry, creative writing, game dialogue, and marketing copy show the <strong>inverse pattern</strong>—they benefit from high creativity and often perform better with confident outputs, even at the cost of factual precision.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                🔬 The Research Middle Ground
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Academic research, scientific literature review, and educational applications occupy a <strong>complex middle space</strong> where multiple competing demands create the sharpest trade-offs. These applications need broad context, high generalization, and excellent calibration simultaneously.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-300 mb-3">
                🤔 The Creative Confidence Paradox
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Counterintuitively, creative applications often benefit from <strong>high confidence even when that confidence isn't well-calibrated</strong>. Uncertainty and self-doubt inhibit creative output, suggesting different domains have fundamentally different relationships with these trade-offs.
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Implications for AI Development
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-blue-300 font-semibold mb-2">Architecture Choices</div>
                <p className="text-slate-300">
                  Rather than one-size-fits-all models, we need specialized architectures optimized for different points along these trade-off curves.
                </p>
              </div>
              <div className="text-center">
                <div className="text-green-300 font-semibold mb-2">Training Strategies</div>
                <p className="text-slate-300">
                  Training regimens could explicitly optimize for specific trade-off profiles based on intended applications.
                </p>
              </div>
              <div className="text-center">
                <div className="text-purple-300 font-semibold mb-2">Evaluation Frameworks</div>
                <p className="text-slate-300">
                  We need approaches that capture the multidimensional nature of these uncertainty relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conclusion */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Embracing Uncertainty as Design Principle
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              The uncertainty principle of LLMs reframes many current challenges in AI development. Rather than viewing limitations as temporary engineering problems, we can understand them as <strong className="text-blue-300">fundamental features that require thoughtful design choices</strong>.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              This perspective suggests that the future of AI lies not in building systems that can do everything perfectly, but in creating <strong className="text-purple-300">ecosystems of specialized systems</strong>, each optimized for different points along these uncertainty curves. The art lies in matching the system's uncertainty profile to the application's needs—embracing precision where it matters most, creativity where it adds value, and calibrated uncertainty where humility is essential.
            </p>
            <div className="text-center">
              <div className="inline-block bg-white/10 rounded-lg px-6 py-3 border border-white/20">
                <p className="text-slate-200 italic">
                  "Just as quantum mechanics didn't eliminate uncertainty but taught us to work within its constraints to achieve remarkable technological breakthroughs, understanding the uncertainty principles of LLMs may be the key to their most effective and beneficial deployment across the full spectrum of human endeavors."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarChartVisualization;