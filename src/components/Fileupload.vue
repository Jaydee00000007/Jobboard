<template>
  <div class="upload-container">
    <!-- 1. Show Input if No File is Selected -->
    <div v-if="!selectedFile" class="uploadA">
      <input type="file" @change="handleFileChange" />
    </div>

    <!-- 2. Show File Details & Update Controls -->
    <div v-else class="file-details">
      <p><strong>Resume:</strong> {{ selectedFile.name }}</p>
      
      <div class="actions ">
        <!-- Update Button: Triggers a file selector to replace the current file -->
        <button @click="triggerNewSelect" class="btn-update">Change File</button>
        
        <!-- Upload Button -->
        <button @click="uploadFile" class="btn-upload">Upload This File</button>
      </div>

      <!-- Hidden Input for Updating -->
      <input 
        type="file" 
        ref="fileInputRef" 
        @change="handleFileChange" 
        style="display: none" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedFile = ref(null);
const fileInputRef = ref(null); // Reference to the hidden file input

// Handles both the initial selection and subsequent updates
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file; // Updates the state with the new file choice
  }
};

// Programmatically opens the file picker when clicking "Change File"
const triggerNewSelect = () => {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''; // Clear previous input DOM value so the change event always fires
    fileInputRef.value.click();
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) return;
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await fetch('https://example.com', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) alert('Upload successful!');
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>
    
<style scoped>

.upload-container {
  max-width: 450px;
  margin: 2rem auto;
  font-family: system-ui, -apple-system, sans-serif;
  color: #333;
}

/* 1. Empty Dropzone/Input State */
.uploadA {
  position: relative;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  background-color: #f8fafc;
  padding: 3rem 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.uploadA:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.uploadA input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* Visual placeholder styling */
.uploadA::before {
  content: "📄 Drag & drop or click to choose a file";
  display: block;
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}

/* 2. File Selected State */
.file-details {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
}

.file-details p {
  margin: 0 0 1.25rem 0;
  font-size: 0.95rem;
  word-break: break-all;
  color: #1e293b;
}

.file-details strong {
  color: #64748b;
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

/* Button Actions Group */
.actions {
  display: flex;
  gap: 0.75rem;
}

/* Base Button Styles */
button {
  flex: 1;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

/* Change File Button */
.btn-update {
  background-color: #f1f5f9;
  color: #475569;
}

.btn-update:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

/* Upload Button */
.btn-upload {
  background-color: #2563eb;
  color: #ffffff;
}

.btn-upload:hover {
  background-color: #1d4ed8;
}

.btn-upload:active {
  transform: scale(0.98);
}
</style>

