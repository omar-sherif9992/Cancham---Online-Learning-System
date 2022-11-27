import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';

import { type INoteData, type ITag } from '@interfaces/note.interface';
import {
  UseTraineeNoteStoreCreateNote,
  UseTraineeNoteStoreTags,
  UseTraineeNoteStoreCreateTag
} from '@store/noteStore';

function NoteForm() {
  const createNote = UseTraineeNoteStoreCreateNote();
  const createTag = UseTraineeNoteStoreCreateTag();
  const availableTags = Array.from(UseTraineeNoteStoreTags());
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const title = titleRef?.current?.value || '';
    const markdown = markdownRef?.current?.value || '';

    if (title && markdown && selectedTags && selectedTags.length > 0) {
      const note: INoteData = {
        title,
        markdown,
        tags: selectedTags
      };

      createNote(note);
    }

    navigate('..');
  }

  return (
    <Container className='my-4'>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={''} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  isMulti
                  options={availableTags.map(tag => {
                    return { label: tag.label, value: tag.id };
                  })}
                  value={[...selectedTags].map(tag => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={function onChange(newTags) {
                    setSelectedTags(
                      newTags.map(tag => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  onCreateOption={function onCreate(label) {
                    alert(`Created tag ${label}`);
                    const newTag = createTag(label);
                    alert('s');
                    alert(`Created tag ${newTag.label}`);
                    setSelectedTags(prev => [...prev, newTag]);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId='markdown'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              ref={markdownRef}
              required
              as='textarea'
              defaultValue=''
              rows={15}
            />
          </Form.Group>
          <Stack className='justify-content-end' direction='horizontal' gap={2}>
            <Button type='submit' variant='primary'>
              Save
            </Button>
            <Link to='..'>
              <Button type='button' variant='outline-secondary'>
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </Container>
  );
}

export default NoteForm;