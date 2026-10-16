export const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    videoId: 'xIr9tSA5vj4',
    title: 'Graphic Design Training & Real-world Placement Review',
    studentName: 'Shina Mathur',
    course: 'Graphic Designing'
  },
  {
    id: 2,
    videoId: 'MvTcXGfCCls',
    title: 'Web Development & Full Stack Practical Experience',
    studentName: 'Ilmuddin Behlim',
    course: 'Web Development'
  },
  {
    id: 3,
    videoId: 'QyM5b3PxyDU',
    title: 'React JS Fast-Track Mentorship & Live Project Review',
    studentName: 'Punya Singh',
    course: 'React JS Development'
  },
  {
    id: 4,
    videoId: 'NzywyzmIYAE',
    title: 'Data Analytics, SQL & Python Online Training Review',
    studentName: 'Shadab Mohammad',
    course: 'Data Analytics'
  },
  {
    id: 5,
    videoId: 'B8qv3oMP0Co',
    title: 'Digital Marketing Comprehensive Course Feedback',
    studentName: 'Geet Kashyap',
    course: 'Digital Marketing'
  },
  {
    id: 6,
    videoId: 'aiOyEoe6Cz4',
    title: 'CAD 3D Modeling & Mechanical Design Student Review',
    studentName: 'Rohit Khandelwal',
    course: '3D CAD & Modeling'
  },
  {
    id: 7,
    videoId: '9bVvGjYvyAw',
    title: 'Animation & VFX Career Transformation Journey',
    studentName: 'Vikas Meena',
    course: '2D & 3D Animation'
  },
  {
    id: 8,
    videoId: 'xWd_207x-Hg',
    title: 'Campus Culture, Dedicated Faculty & Industry Skills',
    studentName: 'Anjali Sharma',
    course: 'Software Engineering'
  }
];

// First three priority videos to preload during initial website startup
export const FIRST_THREE_REVIEW_VIDEOS = VIDEO_TESTIMONIALS.slice(0, 3).map((video) => ({
  ...video,
  thumbnail: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${video.videoId}`
}));

