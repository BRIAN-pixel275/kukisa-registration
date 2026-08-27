import {
  UsersRound,
  GraduationCap,
  Handshake,
  CalendarDays,
} from "lucide-react";

function Benefits() {
  const benefits = [
    {
      icon: <UsersRound />,
      title: "UNITY & FRIENDSHIP",
      description:
        "Be part of a family that stands together, supports one another and builds lasting friendships.",
    },
    {
      icon: <GraduationCap />,
      title: "GUIDANCE & MENTORSHIP",
      description:
        "Connect with fellow students and access guidance as you navigate university life.",
    },
    {
      icon: <Handshake />,
      title: "NETWORKING",
      description:
        "Build meaningful connections with students and the wider Kiambu community.",
    },
    {
      icon: <CalendarDays />,
      title: "EVENTS & ACTIVITIES",
      description:
        "Take part in exciting events, mentorship, community activities and more.",
    },
  ];

  return (
    <section className="benefits" id="benefits">
      <div className="section-heading">
        <span></span>
        <h2>WHY JOIN KUKISA?</h2>
        <span></span>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <article className="benefit-card" key={index}>
            <div className="benefit-icon">
              {benefit.icon}
            </div>

            <h3>{benefit.title}</h3>

            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Benefits;