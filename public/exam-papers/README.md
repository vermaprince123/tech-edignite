# Exam Papers Images

## How to Add Exam Paper Images

1. **Download images** from Facebook posts or other sources
2. **Organize by branch** - Create folders for each branch:
   - `cse/` - Computer Science & Engineering
   - `ece/` - Electronics & Communication Engineering
   - `ee/` - Electrical Engineering
   - `me/` - Mechanical Engineering
   - `ce/` - Civil Engineering
   - `che/` - Chemical Engineering
   - `it/` - Information Technology

3. **Naming Convention**:
   - Use descriptive names: `subject-semester-year-type-page.jpg`
   - Example: `data-structures-3rd-2024-midterm-1.jpg`
   - Example: `digital-electronics-4th-2023-endterm-1.jpg`

4. **Image Specifications**:
   - Format: JPG or PNG
   - Recommended: High quality, readable text
   - File size: Optimize for web (under 1MB per image)

5. **Update the data** in `lib/exam-papers.ts`:
   - Add exam paper entries with image paths
   - Example:
   ```typescript
   {
     id: 1,
     title: "Data Structures - Midterm 2024",
     branch: "CSE",
     subject: "Data Structures",
     semester: "3rd",
     year: "2024",
     examType: "Midterm",
     images: [
       "/exam-papers/cse/data-structures-3rd-2024-midterm-1.jpg",
       "/exam-papers/cse/data-structures-3rd-2024-midterm-2.jpg"
     ],
     description: "Midterm exam paper for Data Structures course",
     uploadedDate: "2024-10-15",
   }
   ```

## Folder Structure

```
public/
  exam-papers/
    cse/
      data-structures-3rd-2024-midterm-1.jpg
      data-structures-3rd-2024-midterm-2.jpg
      algorithms-4th-2023-endterm-1.jpg
    ece/
      digital-electronics-3rd-2024-midterm-1.jpg
      ...
    ee/
      ...
    me/
      ...
    ce/
      ...
    che/
      ...
    it/
      ...
```

## Notes

- Images will be displayed in a lightbox viewer
- Users can navigate between pages using arrow keys or buttons
- Download functionality is available for each page
- Images are optimized for web viewing
