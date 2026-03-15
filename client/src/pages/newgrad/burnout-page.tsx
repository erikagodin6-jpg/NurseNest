import { CategoryPageLayout } from "./category-layout";
import { Flame } from "lucide-react";

export default function BurnoutPage() {
  return (
    <CategoryPageLayout
      title="Burnout Prevention"
      subtitle="Protect your mental health and build sustainable resilience with evidence-based strategies designed specifically for new graduate nurses."
      icon={Flame}
      color="orange"
      seoTitle="New Grad Nurse Burnout Prevention - Mental Health & Resilience | NurseNest"
      seoDescription="Prevent burnout as a new graduate nurse with evidence-based resilience strategies, self-care tools, and mental health resources. Protect your career longevity."
      seoKeywords="new nurse burnout, nursing burnout prevention, nurse mental health, new grad nurse stress, nursing self-care, nurse resilience"
      canonicalPath="/newgrad/burnout"
      premiumContext="Upgrade to access premium burnout assessment tools, structured resilience plans, and detailed self-care frameworks."
      sections={[
        {
          title: "Understanding New Grad Burnout",
          content: "Research shows that 30-50% of new graduate nurses experience burnout within their first two years. Burnout is not a personal failing — it's a predictable response to chronic workplace stress, emotional demands, and the steep learning curve of clinical practice.",
          items: [
            "Emotional exhaustion: feeling drained, overwhelmed, and unable to cope with demands",
            "Depersonalization: developing cynical attitudes toward patients or feeling detached",
            "Reduced personal accomplishment: doubting your competence despite evidence of growth",
            "Physical symptoms: chronic fatigue, insomnia, headaches, frequent illness",
            "Compassion fatigue: secondary traumatic stress from caring for suffering patients",
          ],
        },
        {
          title: "Early Warning Signs",
          content: "Catching burnout early is critical. If you recognize these signs in yourself, take action immediately rather than pushing through. Early intervention prevents the spiral that leads to leaving the profession.",
          items: [
            "Dreading going to work or counting hours until your shift ends",
            "Difficulty sleeping or intrusive thoughts about work during off time",
            "Increased irritability with patients, colleagues, or loved ones",
            "Feeling disconnected from your original motivation for nursing",
            "Relying on unhealthy coping mechanisms (alcohol, isolation, avoidance)",
            "Frequent call-outs or fantasizing about quitting",
          ],
        },
        {
          title: "Evidence-Based Prevention Strategies",
          content: "Prevention is far more effective than recovery. Building sustainable habits from your first day helps you maintain career longevity and professional fulfillment.",
          items: [
            "Physical self-care: regular exercise, adequate sleep (7-9 hours), proper nutrition, hydration",
            "Emotional self-care: journaling, therapy or counseling, processing difficult experiences",
            "Social support: maintaining relationships outside work, connecting with nurse peers",
            "Professional boundaries: limiting overtime, saying no to extra shifts when depleted",
            "Mindfulness and stress management: meditation, deep breathing, progressive muscle relaxation",
            "Purpose reconnection: regularly reflecting on why you chose nursing",
          ],
        },
        {
          title: "Building Resilience",
          content: "Resilience isn't about being tough or suppressing emotions. It's about developing flexible coping strategies, maintaining perspective, and building support systems that help you recover from challenges.",
          items: [
            "Develop a post-shift decompression routine (exercise, meditation, creative outlet)",
            "Build a peer support network — connect with other new grads who understand your experience",
            "Seek clinical supervision or mentorship for processing difficult patient situations",
            "Set meaningful non-work goals to maintain identity beyond your nursing role",
            "Practice self-compassion — you are learning, and mistakes are part of growth",
          ],
        },
        {
          title: "When to Seek Professional Help",
          content: "There is no shame in seeking professional support. Many healthcare systems offer Employee Assistance Programs (EAPs) with free confidential counseling. Therapy is a strength, not a weakness.",
          items: [
            "Symptoms persist despite self-care efforts for more than 2-3 weeks",
            "You experience panic attacks, severe anxiety, or depression symptoms",
            "You have thoughts of self-harm or feel hopeless about your future",
            "Substance use becomes a regular coping mechanism",
            "Your personal relationships are significantly affected by work stress",
          ],
        },
      ]}
      tips={[
        { title: "The 3-3-3 Rule", desc: "After a difficult shift, name 3 things you can see, 3 things you can hear, and 3 things you can touch. This grounding technique helps transition from work mode to personal time." },
        { title: "Micro-Recovery Breaks", desc: "Even 2-minute breaks during your shift — deep breathing in the supply room, stretching in the hallway — can reduce cumulative stress significantly." },
        { title: "Gratitude Practice", desc: "At the end of each shift, identify one positive patient interaction or learning moment. This rewires your brain to notice the rewarding aspects of nursing." },
        { title: "Physical Activity Buffer", desc: "Exercise is the single most effective burnout prevention strategy. Even 20 minutes of walking after a shift reduces cortisol and improves sleep quality." },
      ]}
    />
  );
}
