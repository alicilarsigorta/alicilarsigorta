"use client";

import { motion } from "framer-motion";
import { Handshake, Award, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              style={{ color: 'var(--primary-color)', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}
            >
              Hakkımızda
            </motion.div>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="section-title" 
              style={{ textAlign: 'left', marginTop: '10px', marginBottom: '20px' }}
            >
              Güvende Kalmanız <br /> Bizim <span style={{ color: 'var(--primary-color)' }}>Önceliğimiz</span>
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '40px' }}
            >
              Alıcılar Sigorta olarak, 20 yılı aşkın süredir bireysel ve kurumsal müşterilerimize en güvenilir sigorta çözümlerini sunuyoruz. Teknolojiyi ve geleneksel güveni harmanlayarak, poliçe süreçlerinizi şeffaf, hızlı ve ulaşılabilir kılıyoruz.
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="grid-2"
              style={{ gap: '20px' }}
            >
              <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}><Award size={24} /></div>
                <div>
                  <h5 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '5px' }}>Lisanslı Acente</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>SEGEM onaylı uzman kadro.</p>
                </div>
              </div>
              <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}><Users size={24} /></div>
                <div>
                  <h5 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '5px' }}>10M+ Kullanıcı</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sektörde güvenin adresi.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ position: 'relative', background: '#f8fafc', borderRadius: '32px', padding: '4rem 2rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ 
                width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#fff', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--primary-color)', border: '4px solid #f1f5f9',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '2rem'
              }}>
                <Handshake size={50} />
              </div>
              <h4 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>Şeffaf Sigortacılık</h4>
              <p style={{ color: 'var(--text-muted)', maxWidth: '280px', margin: '0 auto', lineHeight: 1.6 }}>Poliçenizdeki her detayı sizinle birlikte inceliyoruz, sürprizlerle karşılaşmanızı engelliyoruz.</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
