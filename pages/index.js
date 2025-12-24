import { useState, useEffect } from 'react';
import Head from 'next/head';

const avatarColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8B500', '#FF7F50', '#00CED1', '#9370DB', '#20B2AA',
  '#FF69B4', '#00FA9A', '#FFD700', '#FF4500', '#7B68EE'
];

const names = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery',
  'Sage', 'River', 'Sky', 'Blake', 'Drew', 'Jamie', 'Sam', 'Chris',
  'Pat', 'Robin', 'Ash', 'Lee', 'Max', 'Charlie', 'Frankie', 'Jesse',
  'Dakota', 'Hayden', 'Reese', 'Emery', 'Peyton', 'Rowan', 'Phoenix', 'Eden'
];

function generateFollower(id) {
  const firstName = names[Math.floor(Math.random() * names.length)];
  const lastName = names[Math.floor(Math.random() * names.length)];
  const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
  const initial = firstName[0] + lastName[0];
  
  return {
    id,
    name: `${firstName} ${lastName}`,
    username: `@${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}`,
    color,
    initial,
    delay: Math.random() * 2
  };
}

function Follower({ follower, index }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 8);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`follower ${visible ? 'visible' : ''}`}
      style={{ 
        animationDelay: `${follower.delay}s`,
        '--hover-color': follower.color
      }}
    >
      <div className="avatar" style={{ backgroundColor: follower.color }}>
        {follower.initial}
      </div>
      <div className="follower-info">
        <span className="name">{follower.name}</span>
        <span className="username">{follower.username}</span>
      </div>
      <div className="follow-badge">Following you</div>
    </div>
  );
}

export default function Home() {
  const [followers, setFollowers] = useState([]);
  const [count, setCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const generatedFollowers = Array.from({ length: 500 }, (_, i) => generateFollower(i));
    setFollowers(generatedFollowers);
    
    // Animate count
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil((500 - current) / 20);
      if (current >= 500) {
        current = 500;
        clearInterval(interval);
        setShowConfetti(true);
      }
      setCount(current);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>🎉 You Have 500 Followers!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        {showConfetti && (
          <div className="confetti-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i} 
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: avatarColors[i % avatarColors.length]
                }}
              />
            ))}
          </div>
        )}

        <header className="header">
          <div className="celebration">🎉</div>
          <h1>Congratulations!</h1>
          <p className="subtitle">You now have</p>
          <div className="count-display">
            <span className="count">{count}</span>
            <span className="label">Followers</span>
          </div>
          <p className="message">These amazing people are now following you!</p>
        </header>

        <div className="followers-grid">
          {followers.map((follower, index) => (
            <Follower key={follower.id} follower={follower} index={index} />
          ))}
        </div>

        <footer className="footer">
          <p>✨ Every follower counts! Keep being awesome! ✨</p>
        </footer>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1000;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: fall 4s linear infinite;
          border-radius: 2px;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
          }
        }

        .header {
          text-align: center;
          padding: 40px 20px;
          margin-bottom: 30px;
        }

        .celebration {
          font-size: 80px;
          animation: bounce 1s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        h1 {
          font-size: 3.5rem;
          margin: 20px 0 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .subtitle {
          font-size: 1.5rem;
          opacity: 0.9;
          margin-bottom: 15px;
        }

        .count-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px 0;
        }

        .count {
          font-size: 6rem;
          font-weight: 800;
          background: linear-gradient(45deg, #fff, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .label {
          font-size: 1.8rem;
          text-transform: uppercase;
          letter-spacing: 5px;
          opacity: 0.9;
        }

        .message {
          font-size: 1.2rem;
          opacity: 0.85;
          margin-top: 15px;
        }

        .followers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
          padding: 20px;
        }

        .follower {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .follower.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .follower:hover {
          transform: translateY(-5px) scale(1.02);
          background: rgba(255,255,255,0.25);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }

        .follower-info {
          flex: 1;
          min-width: 0;
        }

        .name {
          display: block;
          font-weight: 600;
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .username {
          display: block;
          font-size: 0.85rem;
          opacity: 0.7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .follow-badge {
          background: linear-gradient(45deg, #00c853, #69f0ae);
          color: #004d40;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .footer {
          text-align: center;
          padding: 40px 20px;
          font-size: 1.2rem;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          .count {
            font-size: 4rem;
          }

          .celebration {
            font-size: 60px;
          }

          .followers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
