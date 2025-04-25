// Initial Data
const initialProjects = [
    {
      id: 1,
      title: "Plataforma de E-commerce",
      description: "Una solución completa de comercio electrónico construida con React",
      longDescription: "Esta plataforma de e-commerce ofrece una experiencia de compra fluida y responsive. Incluye gestión de inventario, carrito de compras, pasarela de pago segura y panel de administración para vendedores.",
      imageUrl: "https://via.placeholder.com/400x300",
      technologies: ["React"],
      demoUrl: "https://github.com/Rodacorr",
      githubUrl: "https://github.com/Rodacorr",
      likes: 15,
      comments: [
        { id: 1, author: "María García", text: "¡Excelente trabajo! La interfaz es muy intuitiva." },
        { id: 2, author: "Juan Pérez", text: "¿Cómo manejaste la gestión del estado?" },
      ],
    },
    {
      id: 2,
      title: "Aplicación del Clima",
      description: "Una aplicación meteorológica utilizando React y la API de OpenWeatherMap",
      longDescription: "Esta aplicación proporciona pronósticos meteorológicos precisos y actualizados. Ofrece visualizaciones interactivas, alertas meteorológicas y la capacidad de guardar ubicaciones favoritas.",
      imageUrl: "https://via.placeholder.com/400x300",
      technologies: ["React", "OpenWeatherMap API"],
      demoUrl: "https://github.com/Rodacorr",
      githubUrl: "https://github.com/Rodacorr",
      likes: 8,
      comments: [
        { id: 1, author: "Ana Martínez", text: "¡Me encanta el diseño limpio!" },
      ],
    },
  ];
  
  const emojiOptions = ['😀', '😎', '🚀', '💻', '🎨', '🌟', '🔥', '👨‍💻', '👩‍💻', '🌈'];
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
        headerText.textContent = isCollapsed ? 'Expandir emojis' : 'Contraer emojis';
    });

    addEmojiBtn.onclick = handleAddEmoji;
  }
  
  function selectEmoji(emoji) {
    selectedEmoji = emoji;
    document.querySelectorAll('.emoji-button').forEach(btn => {
      btn.classList.toggle('selected', btn.textContent === emoji);
    });
    addEmojiText.textContent = `Agregar ${emoji} al fondo`;
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