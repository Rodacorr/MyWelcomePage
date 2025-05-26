// Initial Data
const initialProjects = [
    {
      id: 1,
      title: "Royalty UK",
      description: "Software system that simulates the line of succession to the throne of any royal family. This system allows users to experiment with different royal family structures and observe how the line of succession evolves dynamically as events unfold.",
      longDescription: "The simulator is developed in C++ and is operated through command-line interface (CLI) commands in the console. Once the program is running, users can register births, deaths, abdications, list the current line of succession, and simulate ascension to the throne by eligible heirs—all through a simple and clear text-based interface.",
      imageUrl: "./images/RoyaltyUKPhoto.png",
      technologies: ["C++", "CLI"],
      demoUrl: "https://github.com/Rodacorr/RoyaltyUK",
      githubUrl: "https://github.com/Rodacorr/RoyaltyUK",
      likes: 15,
      comments: [
        { id: 1, author: "Mary Garcia", text: "Excellent work! The interface is very intuitive." },
        { id: 2, author: "John Perez", text: "How did you handle successions rules?" },
      ],
    },
    {
      id: 2,
      title: "Notarial managing system",
      description: "This project consists of developing a complete three-tier Java application for managing a notarial study’s database. The system supports data persistence through both a relational database (MySQL) and serialized files on disk, using patterns like DAO, Facade, MVC, and Abstract Factory. It includes concurrent access management through a connection pool and supports switching between persistence mechanisms via configuration files.",
      longDescription: "This project simulates a notarial record management system, built in Java with a clean three-layer design. It supports two persistence modes—MySQL and serialized files—and uses design patterns like DAO, MVC, Facade, and Abstract Factory. Concurrency is handled with connection pools, and the system allows switching persistence modes without changing the core logic, thanks to external configuration.",
      imageUrl: "./images/JavaNotarial.png",
      technologies: ["Java", "MySQL", "MVC", "DAO", "Facade", "Abstract Factory", "Connection Pool"],
      demoUrl: "https://github.com/gregueira/repository/tree/master",
      githubUrl: "https://github.com/gregueira/repository/tree/master",
      likes: 8,
      comments: [
        { id: 1, author: "Ann Martinez", text: "The dual persistence option is a game changer. I was able to switch from MySQL to file-based storage with zero hassle. Super intuitive CLI and solid performance!" },
        { id: 2, author: "John Perez", text: "Loved how the system handles concurrency. Even with multiple users accessing the data, everything ran smoothly. Great learning tool for enterprise-level architecture!" },
      ],
    },
    {
      id: 3,
      title: "Fashion design academy",
      description: "The system follows a client-server architecture, where clients use a graphical user interface to connect to a central server via Java RMI. ",
      longDescription: "The system follows a client-server architecture, where clients use a graphical user interface to connect to a central server via Java RMI. It allows staff to register students (including scholarship information), manage course inscriptions, track grades, generate academic histories, and back up all system data. Persistence is handled via serialized binary files, with data recovery at startup. The project focuses on real-world application design, covering all stages from UML modeling to a fully functional Java implementation.",
      imageUrl: "./images/JavaFashion.png",
      technologies: ["Java", "RMI", "UML", "Serialization", "GUI"],
      demoUrl: "https://github.com/millanlucas89/TallerUDE-2024/tree/main",
      githubUrl: "https://github.com/millanlucas89/TallerUDE-2024/tree/main",
      likes: 10,
      comments: [
        { id: 1, author: "Camila Roman", text: "Very practical system! The GUI is user-friendly and works seamlessly over the network. Great experience managing course data." },
        { id: 2, author: "Javier Larrique", text: "Loved how the system handles concurrency. Even with multiple users accessing the data, everything ran smoothly. Great learning tool for enterprise-level architecture!" },
      ],
    },
  ];
  
  const emojiOptions = ['😀', '😎', '🚀', '💻', '🎨', '🌟', '🔥', '👨‍💻', '👩‍💻', '🌈','❤️'];
  let selectedEmoji = emojiOptions[0];
  let projects = [];
  let emojis = [];
  
  // DOM Elements
  const emojiContainer = document.getElementById('emojiContainer');
  const emojiSelector = document.querySelector('.emoji-selector');
  const header = document.querySelector('.emoji-selector-header');
  const headerText = document.querySelector('.emoji-selector-text');
  const addEmojiBtn = document.getElementById('addEmojiBtn');
  const addEmojiText = document.getElementById('addEmojiText');
  const projectsContainer = document.getElementById('projectsContainer');
  const projectTemplate = document.getElementById('projectTemplate');
  
  // Initialize
  function init() {
    setupStyles();
    loadEmojis();
    loadProjects();
    setupEmojiSelector();
    initThemeToggle();
  }
  
  // Setup initial styles
  function setupStyles() {
    // Asegurarse de que el contenedor de emojis ocupe toda la pantalla
    emojiContainer.style.position = 'fixed';
    emojiContainer.style.top = '0';
    emojiContainer.style.left = '0';
    emojiContainer.style.width = '100%';
    emojiContainer.style.height = '100%';
    emojiContainer.style.pointerEvents = 'none';
    emojiContainer.style.zIndex = '0';
    emojiContainer.style.overflow = 'hidden';
  }
  
  // Emoji Functions
  function loadEmojis() {
    const savedEmojis = localStorage.getItem('backgroundEmojis');
    if (savedEmojis) {
      emojis = JSON.parse(savedEmojis);
      renderEmojis();
    }
  }
  
  function setupEmojiSelector() {
    const emojiSelector = document.querySelector('.emoji-selector');
    const header = document.querySelector('.emoji-selector-header');
    const headerText = document.querySelector('.emoji-selector-text');

    // Configurar los emojis
    emojiOptions.forEach(emoji => {
        const button = document.createElement('button');
        button.className = 'emoji-button';
        button.textContent = emoji;
        button.onclick = () => selectEmoji(emoji);
        emojiSelector.querySelector('.emoji-options').appendChild(button);
    });

    // Toggle para expandir/colapsar
    header.addEventListener('click', () => {
        const isCollapsed = emojiSelector.classList.toggle('collapsed');
        headerText.textContent = isCollapsed ? 'Expand emojis' : 'Collapse emojis';
    });

    addEmojiBtn.onclick = handleAddEmoji;
  }
  
  function selectEmoji(emoji) {
    selectedEmoji = emoji;
    document.querySelectorAll('.emoji-button').forEach(btn => {
      btn.classList.toggle('selected', btn.textContent === emoji);
    });
    addEmojiText.textContent = `Add ${emoji} to background`;
  }
  
  function createEmojiElement(emoji) {
    const div = document.createElement('div');
    div.className = 'emoji-element';
    div.textContent = emoji.emoji;
    
    // Establecer estilos base
    div.style.position = 'absolute';
    div.style.fontSize = '2rem';
    div.style.userSelect = 'none';
    div.style.transition = 'opacity 0.3s ease-in-out';
    
    // Posicionar el emoji
    div.style.left = `${emoji.x}%`;
    div.style.top = `${emoji.y}%`;
    
    // Añadir una animación de entrada
    div.style.opacity = '0';
    requestAnimationFrame(() => {
      div.style.opacity = '1';
    });
    
    return div;
  }
  
  function handleAddEmoji() {
    const newEmoji = {
      id: Date.now(),
      emoji: selectedEmoji,
      x: Math.random() * 90 + 5, 
      y: Math.random() * 90 + 5, 
    };
    
    emojis.push(newEmoji);
    localStorage.setItem('backgroundEmojis', JSON.stringify(emojis));
    

    const emojiElement = createEmojiElement(newEmoji);
    emojiContainer.appendChild(emojiElement);
  }
  
  function renderEmojis() {
    
    emojiContainer.innerHTML = '';
    
   
    emojis.forEach(emoji => {
      const emojiElement = createEmojiElement(emoji);
      emojiContainer.appendChild(emojiElement);
    });
  }
  
  
  function loadProjects() {
    projects = initialProjects;
    renderProjects();
  }
  
  function renderProjects() {
    projectsContainer.innerHTML = '';
    projects.forEach(project => {
      const projectCard = projectTemplate.content.cloneNode(true);
      
      
      projectCard.querySelector('.card-title').textContent = project.title;
      projectCard.querySelector('.card-description').textContent = project.description;
      projectCard.querySelector('.project-image').src = project.imageUrl;
      projectCard.querySelector('.long-description').textContent = project.longDescription;
      
      
      const techContainer = projectCard.querySelector('.technologies');
      project.technologies.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'technology-badge';
        badge.textContent = tech;
        techContainer.appendChild(badge);
      });
      
      
      projectCard.querySelector('.demo-link').href = project.demoUrl;
      projectCard.querySelector('.github-link').href = project.githubUrl;
      
      
      const likeBtn = projectCard.querySelector('.like-button');
      const likesCount = projectCard.querySelector('.likes-count');
      likesCount.textContent = project.likes;
      likeBtn.onclick = () => handleLike(project.id);
      
      
      const commentsList = projectCard.querySelector('.comments-list');
      project.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
          <p class="comment-author">${comment.author}</p>
          <p>${comment.text}</p>
        `;
        commentsList.appendChild(commentDiv);
      });
      
      
      const commentForm = projectCard.querySelector('.comment-form');
      commentForm.onsubmit = (e) => {
        e.preventDefault();
        const textarea = commentForm.querySelector('textarea');
        handleComment(project.id, textarea.value);
        textarea.value = '';
      };
      
      projectsContainer.appendChild(projectCard);
    });
  }
  
  function handleLike(projectId) {
    projects = projects.map(project =>
      project.id === projectId ? { ...project, likes: project.likes + 1 } : project
    );
    renderProjects();
  }
  
  function handleComment(projectId, comment) {
    projects = projects.map(project =>
      project.id === projectId ? {
        ...project,
        comments: [...project.comments, {
          id: project.comments.length + 1,
          author: "Anónimo",
          text: comment
        }]
      } : project
    );
    renderProjects();
  }
  
  // Theme Toggle Functionality
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
  
  
  document.addEventListener('DOMContentLoaded', init);