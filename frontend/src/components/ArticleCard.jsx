import React from 'react';
import { Card, CardContent, Typography, CardActions, Button,Box} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
const ArticleCard = ({ article, isEdit = false, navigate=null, deleteArticle=null }) => {
    return (
        <Card variant="outlined" key={article.id} sx={{ mb: 2 }}>
            <CardContent >
                <Typography variant="h6">{article.title}</Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                    }}
                >
                    {article.body}
                </Typography>
            </CardContent>
            <CardActions>
                {
            isEdit ?
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        href={`/articles/${article.id}`}
                    >
                        <Visibility />
                    </Button>

                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate(`/articles/${article.id}/edit`)}
                    >
                        <Edit />
                    </Button>

                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => deleteArticle(article.id)}
                    >
                        <Delete />
                    </Button>
                </Box>
                :
                <Button size="small" href={`/articles/${article.id}`} color="primary">
                    Read More
                </Button>
        }

            </CardActions>
        </Card>
    );
};

export default ArticleCard;


// {
//     articles.map((article) => (
//         <Card key={article.id} variant="outlined" sx={{ mb: 2 }}>
//             <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Box>
//                     <Typography variant="h6">{article.title}</Typography>
//                     <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                             display: '-webkit-box',
//                             overflow: 'hidden',
//                             WebkitBoxOrient: 'vertical',
//                             WebkitLineClamp: 3,
//                         }}
//                     >
//                         {article.body}
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
//                     <Button
//                         size="small"
//                         variant="contained"
//                         color="primary"
//                         href={`/articles/${article.id}`}
//                     >
//                         <Visibility />
//                     </Button>

//                     <Button
//                         size="small"
//                         variant="contained"
//                         color="secondary"
//                         onClick={() => navigate(`/articles/${article.id}/edit`)}
//                     >
//                         <Edit />
//                     </Button>

//                     <Button
//                         size="small"
//                         variant="contained"
//                         color="error"
//                         onClick={() => deleteArticle(article.id)}
//                     >
//                         <Delete />
//                     </Button>
//                 </Box>
//             </CardContent>
//         </Card>
//     ))
// }